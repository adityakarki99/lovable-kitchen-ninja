
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DeepseekOCRResponse {
  success: boolean;
  data?: {
    text?: string;
    structured_data?: {
      invoice_number?: string;
      date?: string;
      due_date?: string;
      supplier?: string;
      total_amount?: string;
      items?: Array<{
        description?: string;
        quantity?: number;
        unit_price?: number;
        total_price?: number;
      }>;
    };
  };
  error?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the DeepSeek API key from environment variables
    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      throw new Error('DeepSeek API key not found');
    }

    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse the request body to get the file data
    const { image } = await req.json();
    
    if (!image) {
      return new Response(
        JSON.stringify({ error: 'No image data provided' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Processing image with DeepSeek OCR');

    // Make request to DeepSeek API
    const deepseekResponse = await fetch('https://api.deepseek.com/v1/ocr/invoice', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: image,
        options: {
          extract_structured_data: true
        }
      }),
    });

    // Parse DeepSeek response
    const deepseekData = await deepseekResponse.json();
    
    console.log('DeepSeek OCR response received');

    // Check if the OCR was successful
    if (!deepseekResponse.ok) {
      console.error('DeepSeek API error:', deepseekData);
      return new Response(
        JSON.stringify({ success: false, error: deepseekData.error || 'Failed to process invoice' }),
        { 
          status: 422,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Return the extracted information
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: {
          text: deepseekData.text,
          structured_data: deepseekData.structured_data
        }
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

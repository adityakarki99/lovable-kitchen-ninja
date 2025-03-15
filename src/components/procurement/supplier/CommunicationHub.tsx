
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Paperclip, MessageSquare, Plus } from 'lucide-react';
import { messages } from './utils';
import { useToast } from '@/hooks/use-toast';

export const CommunicationHub: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the supplier.",
    });
    
    setNewMessage('');
  };

  return (
    <div className="bg-white border border-kitchen-border h-[calc(100vh-300px)] min-h-[500px] rounded-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        {/* Conversation List */}
        <div className="border-r">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kitchen-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9 bg-white border-kitchen-border"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100%-56px)]">
            {messages.map((conversation) => (
              <div 
                key={conversation.id}
                className={`p-3 border-b hover:bg-kitchen-muted/30 cursor-pointer ${
                  activeConversation === conversation.id ? 'bg-kitchen-muted/50' : ''
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{conversation.supplier}</h3>
                  <div className="flex items-center gap-1">
                    {conversation.unread > 0 && (
                      <Badge className="bg-carbon-blue-60">{conversation.unread}</Badge>
                    )}
                    <span className="text-xs text-kitchen-muted-foreground">
                      {format(conversation.messages[conversation.messages.length - 1].timestamp, 'MMM d')}
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-kitchen-muted-foreground mt-1">
                  {conversation.topic}
                </div>
                <p className="text-sm text-kitchen-muted-foreground mt-1 truncate">
                  {conversation.messages[conversation.messages.length - 1].content}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Conversation */}
        <div className="col-span-2 flex flex-col h-full">
          {activeConversation ? (
            <>
              <div className="p-3 border-b flex justify-between items-center">
                <div>
                  <h2 className="font-medium">
                    {messages.find(m => m.id === activeConversation)?.supplier}
                  </h2>
                  <p className="text-sm text-kitchen-muted-foreground">
                    {messages.find(m => m.id === activeConversation)?.topic}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Call
                </Button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages
                  .find(m => m.id === activeConversation)
                  ?.messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${
                        message.sender !== 'Harbor View Bistro' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender !== 'Harbor View Bistro' 
                            ? 'bg-kitchen-muted' 
                            : 'bg-carbon-blue-60 text-white'
                        }`}
                      >
                        <div className="text-sm">
                          {message.content}
                        </div>
                        <div className={`text-xs mt-1 ${
                          message.sender !== 'Harbor View Bistro' 
                            ? 'text-kitchen-muted-foreground' 
                            : 'text-white/80'
                        }`}>
                          {format(message.timestamp, 'h:mm a')}
                          {message.read && message.sender === 'Harbor View Bistro' && (
                            <span className="ml-1">· Read</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              
              <div className="p-3 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    className="bg-white border-kitchen-border"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    className="bg-carbon-blue-60 hover:bg-carbon-blue-70 shrink-0" 
                    size="icon"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-kitchen-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium">No Conversation Selected</h3>
                <p className="text-kitchen-muted-foreground mt-2">
                  Select a conversation from the list or start a new one
                </p>
                <Button className="mt-4 bg-carbon-blue-60 hover:bg-carbon-blue-70">
                  <Plus className="mr-2 h-4 w-4" />
                  New Conversation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

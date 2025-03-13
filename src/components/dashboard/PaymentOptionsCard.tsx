
import { CreditCard, Banknote, Calendar, ArrowRight, ChevronDown, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const PaymentOptionsCard = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Flexible Payment Options</CardTitle>
          <CardDescription>
            Offer customizable payment plans with multiple payment methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="plans">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="plans" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Payment Plans
              </TabsTrigger>
              <TabsTrigger value="methods" className="flex-1">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="plans">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">One-Time Payment</CardTitle>
                    <CardDescription>Full balance payment</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment:</span>
                        <span className="font-medium">100% upfront</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Discount:</span>
                        <span className="font-medium">5% off total</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timeframe:</span>
                        <span className="font-medium">Immediate</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Enable
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="border-primary">
                  <div className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 absolute right-3 top-3 rounded-full">
                    Most Popular
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Installment Plan</CardTitle>
                    <CardDescription>3-6 month payment plan</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment:</span>
                        <span className="font-medium">Equal monthly payments</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interest:</span>
                        <span className="font-medium">0% for first 3 months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timeframe:</span>
                        <span className="font-medium">3-6 months</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" className="w-full">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Enabled
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Extended Plan</CardTitle>
                    <CardDescription>Longer term settlement</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment:</span>
                        <span className="font-medium">Flexible amounts</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interest:</span>
                        <span className="font-medium">Reduced rate</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timeframe:</span>
                        <span className="font-medium">6-24 months</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Enable
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="mt-6 bg-secondary/50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Customer Payment Plan Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>One-Time Payment</span>
                          <span>22%</span>
                        </div>
                        <Progress value={22} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Installment Plan</span>
                          <span>64%</span>
                        </div>
                        <Progress value={64} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Extended Plan</span>
                          <span>14%</span>
                        </div>
                        <Progress value={14} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="methods">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-secondary/50 p-4 rounded-lg flex items-center">
                    <div className="mr-4 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Credit/Debit Cards</h3>
                      <p className="text-xs text-muted-foreground mt-1">Visa, Mastercard, Amex</p>
                    </div>
                    <div className="ml-auto">
                      <input type="checkbox" className="h-4 w-4 rounded" checked readOnly />
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg flex items-center">
                    <div className="mr-4 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                      <Banknote className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Bank Transfers</h3>
                      <p className="text-xs text-muted-foreground mt-1">ACH, Wire, Direct Debit</p>
                    </div>
                    <div className="ml-auto">
                      <input type="checkbox" className="h-4 w-4 rounded" checked readOnly />
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg flex items-center">
                    <div className="mr-4 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16V8M9 12H15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Digital Wallets</h3>
                      <p className="text-xs text-muted-foreground mt-1">Apple Pay, Google Pay</p>
                    </div>
                    <div className="ml-auto">
                      <input type="checkbox" className="h-4 w-4 rounded" checked readOnly />
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg flex items-center">
                    <div className="mr-4 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M3 12H7M21 12H17M12 3V7M12 21V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Cryptocurrency</h3>
                      <p className="text-xs text-muted-foreground mt-1">Bitcoin, Ethereum</p>
                    </div>
                    <div className="ml-auto">
                      <input type="checkbox" className="h-4 w-4 rounded" />
                    </div>
                  </div>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Payment Method Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Credit/Debit Cards</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Bank Transfers</span>
                          <span className="font-medium">23%</span>
                        </div>
                        <Progress value={23} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Digital Wallets</span>
                          <span className="font-medium">9%</span>
                        </div>
                        <Progress value={9} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Cryptocurrency</span>
                          <span className="font-medium">0%</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default PaymentOptionsCard;

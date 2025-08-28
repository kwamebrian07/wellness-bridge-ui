import { useState, useEffect } from "react";
import { ArrowLeft, Clock, User, Bookmark, BookmarkCheck, Share2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getDiseaseById } from "@/data/diseases";
import type { DiseaseContent } from "@/data/diseases";
import { toast } from "sonner";

interface DiseaseDetailPageProps {
  diseaseId: string;
  onNavigate: (page: string, params?: any) => void;
  currentLanguage: string;
}

const categoryConfig = {
  communicable: {
    color: "text-warning",
    bgColor: "bg-warning/10",
    label: "Communicable Disease"
  },
  "non-communicable": {
    color: "text-info",
    bgColor: "bg-info/10", 
    label: "Non-Communicable Disease"
  },
  emergency: {
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    label: "Emergency"
  }
};

const severityConfig = {
  low: "border-l-4 border-l-success",
  medium: "border-l-4 border-l-warning", 
  high: "border-l-4 border-l-destructive"
};

export default function DiseaseDetailPage({ diseaseId, onNavigate, currentLanguage }: DiseaseDetailPageProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isReading, setIsReading] = useState(false);
  
  const disease = getDiseaseById(diseaseId);

  // Initialize saved state from localStorage
  useEffect(() => {
    const savedDiseases = JSON.parse(localStorage.getItem('savedDiseases') || '[]');
    setIsSaved(savedDiseases.includes(diseaseId));
  }, [diseaseId]);
  
  if (!disease) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Disease Not Found</h2>
          <p className="text-muted-foreground mb-6">The requested disease information could not be found.</p>
          <Button onClick={() => onNavigate("browse")}>
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  // Get content in current language or fallback to English
  const content: DiseaseContent = disease.content[currentLanguage as keyof typeof disease.content] || disease.content.en;
  const categoryInfo = categoryConfig[disease.category];

  const handleSave = () => {
    const savedDiseases = JSON.parse(localStorage.getItem('savedDiseases') || '[]');
    const newSavedState = !isSaved;
    
    if (newSavedState) {
      if (!savedDiseases.includes(diseaseId)) {
        savedDiseases.push(diseaseId);
        toast.success(`${disease?.name} saved for offline reading`);
      }
    } else {
      const index = savedDiseases.indexOf(diseaseId);
      if (index > -1) {
        savedDiseases.splice(index, 1);
        toast.success(`${disease?.name} removed from saved`);
      }
    }
    
    localStorage.setItem('savedDiseases', JSON.stringify(savedDiseases));
    setIsSaved(newSavedState);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: disease.name,
          text: disease.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleTextToSpeech = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(content.overview);
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate("browse")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleTextToSpeech}
              className="flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              {isReading ? "Stop" : "Listen"}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              {isSaved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>

        {/* Disease Title & Info */}
        <Card className={`mb-6 ${disease.severity ? severityConfig[disease.severity] : ''}`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={`${categoryInfo.bgColor} ${categoryInfo.color}`}>
                    {categoryInfo.label}
                  </Badge>
                  {disease.severity && (
                    <Badge variant="outline" className="capitalize">
                      {disease.severity} Risk
                    </Badge>
                  )}
                  {disease.isOfflineAvailable && (
                    <Badge variant="secondary">
                      Available Offline
                    </Badge>
                  )}
                </div>
                
                <CardTitle className="text-3xl mb-2">{disease.name}</CardTitle>
                <CardDescription className="text-base">
                  {disease.description}
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
              {disease.estimatedReadTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {disease.estimatedReadTime} read
                </div>
              )}
              {disease.reviewedBy && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Reviewed by {disease.reviewedBy}
                </div>
              )}
              <div>Updated {disease.lastUpdated}</div>
            </div>
          </CardHeader>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
            <TabsTrigger value="treatment">Treatment</TabsTrigger>
            <TabsTrigger value="living">Living With</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{content.overview}</p>
              </CardContent>
            </Card>

            {content.causes && content.causes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Causes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {content.causes.map((cause, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {content.riskFactors && content.riskFactors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {content.riskFactors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="symptoms">
            <Card>
              <CardHeader>
                <CardTitle>Symptoms</CardTitle>
                <CardDescription>
                  Common signs and symptoms to watch for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {content.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
                
                {content.diagnosis && content.diagnosis.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h4 className="font-semibold mb-3">Diagnosis Methods</h4>
                      <ul className="space-y-2">
                        {content.diagnosis.map((method, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-info rounded-full mt-2 flex-shrink-0"></span>
                            <span>{method}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prevention">
            <Card>
              <CardHeader>
                <CardTitle>Prevention</CardTitle>
                <CardDescription>
                  Steps you can take to prevent this condition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {content.prevention.map((method, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></span>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treatment">
            <Card>
              <CardHeader>
                <CardTitle>Treatment</CardTitle>
                <CardDescription>
                  Available treatment options and approaches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {content.treatment.map((treatment, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>{treatment}</span>
                    </li>
                  ))}
                </ul>
                
                {content.complications && content.complications.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h4 className="font-semibold mb-3 text-destructive">Possible Complications</h4>
                      <ul className="space-y-2">
                        {content.complications.map((complication, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                            <span>{complication}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="living">
            <div className="space-y-6">
              {content.livingWith && content.livingWith.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Living With {disease.name}</CardTitle>
                    <CardDescription>
                      Daily management and lifestyle adjustments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {content.livingWith.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-info rounded-full mt-2 flex-shrink-0"></span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.faqs.map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-semibold mb-2">{faq.question}</h4>
                      <p className="text-muted-foreground mb-4">{faq.answer}</p>
                      {index < content.faqs.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Resources & Support</h3>
              <div className="grid gap-4">
                {content.resources.map((resource, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">{resource.title}</h4>
                      <p className="text-muted-foreground">{resource.description}</p>
                      {resource.url && (
                        <Button variant="outline" size="sm" className="mt-3">
                          Visit Resource
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Emergency Contact</h4>
                  <p className="text-muted-foreground mb-3">
                    If you're experiencing a medical emergency, call:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Emergency Services:</span>
                      <span>191 or 999</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">National Health Insurance:</span>
                      <span>0800-100-200</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
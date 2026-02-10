import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Star, MessageSquare, Trash2, ArrowDown, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const mockReviews = [
  {
    id: "1",
    guestName: "John Doe",
    property: "Luxury Beachfront Villa",
    rating: 5,
    date: "Feb 10, 2026",
    comment: "Incredible property! Amazing views and excellent service. Highly recommended!",
    helpful: 24,
    response: "Thank you for the wonderful review! We're thrilled you enjoyed your stay.",
  },
  {
    id: "2",
    guestName: "Jane Smith",
    property: "Mountain Boutique Hotel",
    rating: 4,
    date: "Feb 8, 2026",
    comment: "Great location and friendly staff. The room was clean and comfortable.",
    helpful: 18,
    response: null,
  },
  {
    id: "3",
    guestName: "Mike Johnson",
    property: "Luxury Beachfront Villa",
    rating: 5,
    date: "Feb 5, 2026",
    comment: "Perfect getaway! Beautiful surroundings and attentive staff. Will definitely come back!",
    helpful: 32,
    response: "We can't wait to welcome you back! Thank you for staying with us.",
  },
  {
    id: "4",
    guestName: "Sarah Williams",
    property: "Mountain Boutique Hotel",
    rating: 3,
    date: "Feb 1, 2026",
    comment: "Good accommodation but WiFi was slow. Other than that, the experience was decent.",
    helpful: 8,
    response: null,
  },
];

interface UserData {
  id: string;
  role: string;
}

interface Review {
  id: string;
  guestName: string;
  property: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  response: string | null;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [sortBy, setSortBy] = useState("recent");
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [responseModal, setResponseModal] = useState<{ id: string; response: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        
        if (userData.role !== 'hotelOwner') {
          navigate('/dashboard');
          return;
        }
        
        setUser(userData);
      } catch (error) {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
    toast({
      title: "Success",
      description: "Review deleted successfully.",
    });
  };

  const handleAddResponse = (id: string) => {
    if (!responseModal?.response) {
      toast({
        title: "Error",
        description: "Please write a response.",
        variant: "destructive",
      });
      return;
    }

    setReviews(reviews.map(r => 
      r.id === id 
        ? { ...r, response: responseModal.response }
        : r
    ));
    setResponseModal(null);
    toast({
      title: "Success",
      description: "Response added successfully.",
    });
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    if (sortBy === "helpful") return b.helpful - a.helpful;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-secondary/30 min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Guest Reviews</h1>
            </div>
            <p className="text-muted-foreground">Manage and respond to guest reviews</p>
          </div>

          {/* Summary Card */}
          <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Average Rating</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">{averageRating}</span>
                  <span className="text-muted-foreground">/5.0</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(parseFloat(averageRating))
                          ? "fill-golden text-golden"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Reviews</p>
                <p className="text-4xl font-bold text-foreground">{reviews.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Helpful Votes</p>
                <p className="text-4xl font-bold text-foreground">{reviews.reduce((sum, r) => sum + r.helpful, 0)}</p>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mb-6 flex gap-2 flex-wrap">
            {["recent", "highest", "lowest", "helpful"].map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  sortBy === option
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {sortedReviews.map((review) => (
              <div key={review.id} className="bg-card rounded-2xl shadow-card p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 pb-4 border-b border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{review.guestName}</h3>
                      <p className="text-sm text-muted-foreground">{review.property}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-golden text-golden"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>

                <p className="text-foreground mb-4">{review.comment}</p>

                {review.response && (
                  <div className="bg-primary/5 rounded-lg p-4 mb-4 border border-primary/20">
                    <p className="text-sm font-semibold text-primary mb-2">Your Response:</p>
                    <p className="text-sm text-foreground">{review.response}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <ArrowUp className="w-4 h-4" />
                      {review.helpful}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {!review.response && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setResponseModal({ id: review.id, response: "" })}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Respond
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response Modal */}
        {responseModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-2xl shadow-card p-6 w-full max-w-md">
              <h3 className="text-lg font-bold text-foreground mb-4">Add Response</h3>
              <textarea
                value={responseModal.response}
                onChange={(e) => setResponseModal({ ...responseModal, response: e.target.value })}
                placeholder="Write your response..."
                className="w-full border border-border rounded-lg p-3 bg-secondary text-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setResponseModal(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleAddResponse(responseModal.id)}
                  className="flex-1"
                >
                  Submit Response
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

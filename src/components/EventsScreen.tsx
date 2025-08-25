import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Filter, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: {
    name: string;
    role: string;
    avatar: string;
  };
  attendees: number;
  maxAttendees?: number;
  category: "study" | "social" | "fitness" | "tower" | "food" | "cultural";
  tower?: string;
  isAttending: boolean;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Henday 7th Floor Study Session",
    description: "Group study for ECON 101 midterm. Pizza provided! 🍕",
    date: "2024-01-15",
    time: "7:00 PM",
    location: "Henday Study Lounge",
    organizer: {
      name: "Sarah Chen",
      role: "Floor Captain",
      avatar: ""
    },
    attendees: 12,
    maxAttendees: 20,
    category: "study",
    tower: "Henday",
    isAttending: true
  },
  {
    id: "2",
    title: "Lister Cafe Karaoke Night",
    description: "Show off your singing skills! Open to all Lister residents. Prizes for best performances! 🎤",
    date: "2024-01-16",
    time: "8:00 PM",
    location: "Lister Cafe",
    organizer: {
      name: "Marcus Johnson",
      role: "VP Internal",
      avatar: ""
    },
    attendees: 45,
    maxAttendees: 80,
    category: "social",
    isAttending: false
  },
  {
    id: "3",
    title: "Morning Yoga Class",
    description: "Start your day right with relaxing yoga. Mats provided. All skill levels welcome! 🧘‍♀️",
    date: "2024-01-15",
    time: "7:00 AM",
    location: "Lister Gym",
    organizer: {
      name: "Emma Wilson",
      role: "Wellness Coordinator",
      avatar: ""
    },
    attendees: 8,
    maxAttendees: 15,
    category: "fitness",
    isAttending: false
  },
  {
    id: "4",
    title: "Dumplings & Culture Night",
    description: "Learn to make dumplings while sharing stories from around the world. Ingredients provided! 🥟",
    date: "2024-01-17",
    time: "6:30 PM",
    location: "Mackenzie Community Kitchen",
    organizer: {
      name: "Li Zhang",
      role: "Cultural Committee",
      avatar: ""
    },
    attendees: 23,
    maxAttendees: 30,
    category: "cultural",
    tower: "Mackenzie",
    isAttending: true
  }
];

const categoryColors = {
  study: "bg-blue-100 text-blue-800 border-blue-200",
  social: "bg-purple-100 text-purple-800 border-purple-200", 
  fitness: "bg-green-100 text-green-800 border-green-200",
  tower: "bg-primary/10 text-primary border-primary/20",
  food: "bg-orange-100 text-orange-800 border-orange-200",
  cultural: "bg-pink-100 text-pink-800 border-pink-200"
};

export const EventsScreen = () => {
  const [events, setEvents] = useState(mockEvents);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRSVP = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isAttending: !event.isAttending,
            attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1
          }
        : event
    ));
  };

  const getEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === "all" || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full bg-background">
      {/* Search and Filter Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="flex-shrink-0"
          >
            All Events
          </Button>
          <Button
            variant={filter === "study" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("study")}
            className="flex-shrink-0"
          >
            Study
          </Button>
          <Button
            variant={filter === "social" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("social")}
            className="flex-shrink-0"
          >
            Social
          </Button>
          <Button
            variant={filter === "fitness" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("fitness")}
            className="flex-shrink-0"
          >
            Fitness
          </Button>
          <Button
            variant={filter === "cultural" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("cultural")}
            className="flex-shrink-0"
          >
            Cultural
          </Button>
        </div>
      </div>

      {/* Events List */}
      <div className="p-4 space-y-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card animate-slide-up">
            {/* Event Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={event.organizer.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {event.organizer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{event.organizer.name}</p>
                  <p className="text-xs text-muted-foreground">{event.organizer.role}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <Badge className={categoryColors[event.category]}>
                  {event.category}
                </Badge>
                {event.tower && (
                  <Badge variant="outline" className="text-xs">
                    {event.tower} Tower
                  </Badge>
                )}
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-2 mb-4">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-muted-foreground text-sm">{event.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{getEventDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {event.attendees} attending
                  {event.maxAttendees && ` • ${event.maxAttendees - event.attendees} spots left`}
                </span>
              </div>
            </div>

            {/* RSVP Button */}
            <Button
              onClick={() => handleRSVP(event.id)}
              className={`w-full ${
                event.isAttending 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-accent text-accent-foreground hover:bg-accent/90'
              }`}
            >
              {event.isAttending ? 'Attending ✓' : 'Join Event'}
            </Button>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No events found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
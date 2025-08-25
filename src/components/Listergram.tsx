import { useState } from "react";
import { Layout } from "@/components/Layout";
import { FeedScreen } from "@/components/FeedScreen";
import { EventsScreen } from "@/components/EventsScreen";
import { DatingScreen } from "@/components/DatingScreen";
import { MessagesScreen } from "@/components/MessagesScreen";
import { ProfileScreen } from "@/components/ProfileScreen";

export const Listergram = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "home":
        return <FeedScreen />;
      case "events":
        return <EventsScreen />;
      case "dating":
        return <DatingScreen />;
      case "messages":
        return <MessagesScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <FeedScreen />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderActiveScreen()}
    </Layout>
  );
};
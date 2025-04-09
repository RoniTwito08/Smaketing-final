// src/PlansPage.tsx
import React, { useState, useEffect } from 'react';
import PlanItem from './PlanItem';

interface Plan {
  _id: string;
  name: string;
  description: string;
  pricing: {
    price?: {
      value: number;
      currency: string;
    };
  };
  perks?: { values?: string[] };
}

const PlansPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const data: Plan[] = [
        {
          _id: "1",
          name: "תכנית בסיסית",
          description: "תכנית המיועדת להתנסות.",
          pricing: { price: { value: 10, currency: "ILS" } },
          perks: { values: ["Feature 1", "Feature 2", "Feature 3"] },
        },
        {
          _id: "2",
          name: "תכנית מתקדמת",
          description: "כוללת תכונות מתקדמות.",
          pricing: { price: { value: 20, currency: "ILS" } },
          perks: { values: ["Feature A", "Feature B", "Feature C"] },
        },
      ];
      setPlans(data);
    };

    fetchPlans();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-6">בחר את מסלול השיווק שלך </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanItem key={plan._id} plan={plan} checkoutData="some-checkout-data" />
        ))}
      </ul>
    </div>
  );
};

export default PlansPage;

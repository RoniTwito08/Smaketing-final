import styles from './PlanItem.module.css';
import PlanSelect from './PlanSelect';


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

interface PlanItemProps {
  plan: Plan;
  checkoutData?: string;
}

const testIds = {
  PLAN_ITEM: {
    CONTAINER: 'plan-item-container',
    CHECKOUT_CTA: 'plan-item-checkout-cta',
  },
};
function getCheckoutUrl({ plan, checkoutData }: { plan: Plan; checkoutData?: string }) {
  const baseUrl = 'https://example.com/checkout'; 
  const planId = plan._id;
  const checkoutUrl = `${baseUrl}?planId=${planId}`;
  if (checkoutData) {
    return `${checkoutUrl}&checkoutData=${encodeURIComponent(checkoutData)}`;
  }
  return checkoutUrl;
}
export default function PlanItem({ plan, checkoutData }: PlanItemProps) {
  const priceParts = {
    price: plan.pricing?.price?.value.toString() || '0',
    currencySign: plan.pricing?.price?.currency || '₪',
  };

  return (
    <li
      key={plan._id}
      data-testid={testIds.PLAN_ITEM.CONTAINER}
      className={styles.planItem}
    >
      <div className={styles.planItemMain}>
        <h2 className={styles.planName}>{plan.name}</h2>
        <div className={styles.planPrice}>
          <span className={styles.currency}>{priceParts.currencySign}</span>
          <span className={styles.amount}>{priceParts.price}</span>
        </div>
        <p className={styles.planDescription}>{plan.description}</p>
        <PlanSelect checkoutUrl={getCheckoutUrl({ plan, checkoutData })}>
          <button className={styles.selectButton}>בחר מסלול</button>
        </PlanSelect>
      </div>
      <div className={styles.planPerks}>
        <ul>
          {plan.perks?.values?.map((perk, index) => (
            <li key={index} className={styles.perkItem}>
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );


}


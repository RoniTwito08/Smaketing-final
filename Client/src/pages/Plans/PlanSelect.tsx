// src/components/PlanSelect.tsx
import { PropsWithChildren } from 'react';
import styles from './PlanSelect.module.css';

interface PlanSelectProps {
  checkoutUrl: string;
}
const testIds = {
  PLAN_ITEM: {
    CHECKOUT_CTA: 'plan-item-checkout-cta',
  },
};

export default function PlanSelect({
  checkoutUrl,
  children,
}: PropsWithChildren<PlanSelectProps>) {
  return (
    <a
      className={styles.planSelectLink}
      href={checkoutUrl}
      data-testid={testIds.PLAN_ITEM.CHECKOUT_CTA}
    >
      {children}
    </a>
  );
}


// OrderFlow.jsx
import { useState } from "react";
import { SuccessState } from "./SuccessState";
import { PaymentInfo } from "./PaymentInfo";

export function OrderFlow() {
  const [showPayment, setShowPayment] = useState(false);

  if (!showPayment) {
    return <SuccessState onContinue={() => setShowPayment(true)} />;
  }

  return <PaymentInfo />;
}

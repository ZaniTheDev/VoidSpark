"use client";

import { useOrderForm } from "./_hooks/useOrderForm";
import { useScrollAnimations } from "./_hooks/useScrollAnimations";
import { StepIndicator } from "./_components/StepIndicator";
import { PricingCard } from "./_components/PricingCard";
import { DesignStep } from "./_components/DesignStep";
import { DetailsStep } from "./_components/DetailsStep";
import { ContactStep } from "./_components/ContactStep";
import { PaymentInfo } from "./_components/PaymentInfo";
import { StepsGuide } from "./_components/StepsGuide";
import { SuccessState } from "./_components/SuccessState";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { pricingPlans } from "./_config/pricing";

export default function OrderPage() {
  const {
    form,
    step,
    submitted,
    setStep,
    setSubmitted,
    updateField,
    toggleMood,
    canProceed,
  } = useOrderForm();

  const {
    pageRef,
    headerRef,
    stepsRef,
    sectionRefs,
    pricingRefs,
    formRef,
    payRef,
  } = useScrollAnimations();

  const renderStep = () => {
    if (submitted) return <SuccessState />;

    switch (step) {
      case 1:
        return (
          <DesignStep
            form={form}
            updateField={updateField}
            toggleMood={toggleMood}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <DetailsStep
            form={form}
            updateField={updateField}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return (
          <ContactStep
            form={form}
            updateField={updateField}
            onBack={() => setStep(2)}
            onSubmit={() => setSubmitted(true)}
            canSubmit={canProceed.step3}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-white text-black font-sans antialiased overflow-x-hidden"
    >
      <Header ref={headerRef} />

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-20">
        <StepsGuide stepsRef={stepsRef} sectionRefs={sectionRefs} />

        {/* Pricing Section */}
        <section>
          <div ref={(el) => (sectionRefs.current[1] = el)} className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 mb-2">
              Langkah 1
            </p>
            <h2
              className="text-2xl font-semibold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Pilih Paket
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pricingPlans.map((plan, i) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isActive={form.paket === plan.id}
                onSelect={(paketId) => updateField("paket", paketId)}
                ref={(el) => (pricingRefs.current[i] = el)}
              />
            ))}
          </div>
        </section>

        {/* Form Section */}
        <section>
          <div ref={(el) => (sectionRefs.current[2] = el)} className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 mb-2">
              Langkah 2
            </p>
            <h2
              className="text-2xl font-semibold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Formulir Desain
            </h2>
            <p className="text-sm text-black/45 mt-1.5">
              Ceritakan visi desain Anda kepada kami.
            </p>
          </div>

          <div ref={formRef}>
            {!submitted && (
              <div className="rounded-2xl border border-black/10 overflow-hidden">
                <StepIndicator
                  step={step}
                  steps={["Desain", "Detail", "Kontak"]}
                />
                <div className="p-8 space-y-7">{renderStep()}</div>
              </div>
            )}
            {submitted && <SuccessState />}
          </div>
        </section>

        {/* Payment Section */}
        <section>
          <div ref={(el) => (sectionRefs.current[3] = el)} className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 mb-2">
              Langkah 3
            </p>
            <h2
              className="text-2xl font-semibold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Informasi Pembayaran
            </h2>
            <p className="text-sm text-black/45 mt-1.5">
              Transfer setelah brief diterima dan invoice dikirimkan.
            </p>
          </div>

          <div ref={payRef}>
            <PaymentInfo />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

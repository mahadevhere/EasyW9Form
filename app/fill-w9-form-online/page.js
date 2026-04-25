"use client";
// Version: 1.0.2 - Fixed Success UI

import { useState, useCallback, useRef, useEffect } from "react";
import SignatureCanvas from 'react-signature-canvas';
import dynamic from "next/dynamic";
import Link from "next/link";

const DocumentUpload = dynamic(() => import("@/components/DocumentUpload"), {
  ssr: false,
});

const STEPS = [
  { id: 1, label: "Basic Info", title: "Personal / Entity Information" },
  { id: 2, label: "Tax Class", title: "Federal Tax Classification" },
  { id: 3, label: "Address", title: "Address & Account Details" },
  { id: 4, label: "Tax ID", title: "Taxpayer Identification Number" },
  { id: 5, label: "Review", title: "Sign, Review & Download" },
];

const TAX_OPTIONS = [
  {
    value: "Individual",
    label: "Individual / Sole Proprietor",
    hint: "Most freelancers & independent contractors",
  },
  { value: "C-Corp", label: "C Corporation", hint: "Standard corporation" },
  { value: "S-Corp", label: "S Corporation", hint: "Pass-through corporation" },
  { value: "Partnership", label: "Partnership", hint: "Two or more partners" },
  {
    value: "Trust",
    label: "Trust / Estate",
    hint: "Legal trust or estate entity",
  },
  {
    value: "LLC",
    label: "Limited Liability Company (LLC)",
    hint: "Enter tax classification below",
  },
  { value: "Other", label: "Other", hint: "Specify in the field below" },
];

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export default function FillW9Form() {
  const [step, setStep] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOcr, setShowOcr] = useState(false);
  const sigPadRef = useRef(null);
  const [ocrRawText, setOcrRawText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    taxClassification: "",
    llcClassification: "",
    otherClassification: "",
    exemptPayeeCode: "",
    fatcaCode: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    requesterName: "",
    accountNumbers: "",
    taxIdType: "SSN",
    taxId: "",
    signatureName: "",
    signatureImage: null,
    signatureType: "draw", // Default to draw for better UX
    signatureColor: "blue",
    signatureFont: "cursive",
    signatureDate: "",
  });
  const [draftPdfUrl, setDraftPdfUrl] = useState(null);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

  const [showRestoreOverlay, setShowRestoreOverlay] = useState(false);

  const resetForm = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem("w9_draft");
      sessionStorage.removeItem("w9_current_form_id");
      sessionStorage.removeItem("w9_step");
      window.location.href = '/fill-w9-form-online'; 
    }
  }, []);

  const [formId, setFormId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [showTaxHelp, setShowTaxHelp] = useState(false);
  const [leadEmailSent, setLeadEmailSent] = useState(false);


  const initData = async () => {
    let currentId = sessionStorage.getItem("w9_current_form_id");
    if (!currentId) {
      currentId = 'w9_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("w9_current_form_id", currentId);
    }
    setFormId(currentId);
    
    // 1. First, restore the form content from session storage
    const savedDraft = sessionStorage.getItem("w9_draft");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData((prev) => ({ ...prev, ...parsed, formId: currentId }));
      } catch (e) {}
    }

    const savedStep = sessionStorage.getItem("w9_step");
    if (savedStep) {
      setStep(parseInt(savedStep));
    }

    // 2. Then, verify the payment status from the backend
    try {
      const res = await fetch(`/api/save-draft?formId=${currentId}`);
      if (res.ok) {
        const body = await res.json();
        if (body.isPaid) setIsPaid(true);
      }
    } catch (e) {}

    setIsInitialized(true);
  };

  useEffect(() => {
    if (sessionStorage.getItem("w9_draft")) {
      setShowRestoreOverlay(true);
    }
    initData();
  }, []);

  // Restore auto-preview for Step 5
  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => {
        generateDraftPreviewWithData(formDataRef.current);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [formData, step, isPaid]);

  const formDataRef = useRef(formData);
  useEffect(() => {
    if (!isInitialized) return; // Wait until loaded to avoid overwriting with defaults
    
    formDataRef.current = formData;
    sessionStorage.setItem("w9_draft", JSON.stringify(formData));
    sessionStorage.setItem("w9_step", step.toString());
    
    // Backend Sync (Debounced)
    const timeout = setTimeout(() => {
        if (formId && step > 0) {
            fetch("/api/save-draft", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formId, formData, email: userEmail })
            }).catch(() => {});
        }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [formData, step, formId, userEmail, isInitialized]);



  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    [step],
  );

  const handleRadio = useCallback(
    (name, value) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    [step],
  );

  const handleOcrData = useCallback((extracted, rawText) => {
    setOcrRawText(rawText);
    setFormData((prev) => {
      const updated = { ...prev };
      if (extracted.name) updated.name = extracted.name;
      if (extracted.businessName) updated.businessName = extracted.businessName;
      if (extracted.street) updated.street = extracted.street;
      if (extracted.city) updated.city = extracted.city;
      if (extracted.state) updated.state = extracted.state;
      if (extracted.zip) updated.zip = extracted.zip;
      if (extracted.taxIdType) updated.taxIdType = extracted.taxIdType;
      if (extracted.taxId) updated.taxId = extracted.taxId;
      return updated;
    });
    setShowOcr(false);
  }, []);

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!formData.name.trim()) e.name = "Full name is required";
    }
    if (step === 2) {
      if (!formData.taxClassification)
        e.taxClassification = "Please select a classification";
      if (formData.taxClassification === "LLC" && !formData.llcClassification)
        e.llcClassification = "LLC classification required";
      if (
        formData.taxClassification === "Other" &&
        !formData.otherClassification.trim()
      )
        e.otherClassification = "Please specify";
    }
    if (step === 3) {
      if (!formData.street.trim()) e.street = "Street address is required";
      if (!formData.city.trim()) e.city = "City is required";
      if (!formData.state) e.state = "State is required";
      if (!formData.zip.trim()) e.zip = "ZIP code is required";
      else if (!/^\d{5}(-\d{4})?$/.test(formData.zip.trim()))
        e.zip = "Enter a valid ZIP code";
    }
    if (step === 4) {
      if (!formData.taxId.trim()) e.taxId = "Tax ID is required";
      else {
        const clean = formData.taxId.replace(/\D/g, "");
        if (clean.length !== 9)
          e.taxId = `${formData.taxIdType} must be exactly 9 digits`;
      }
    }
    if (step === 5) {
        if (!formData.signatureImage && formData.signatureType !== 'text') e.signature = "Please sign the form";
        if (formData.signatureType === 'text' && !formData.signatureName.trim()) e.signatureName = "Signature name required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (validateStep()) {
      const nextStep = Math.min(step + 1, 5);
      setStep(nextStep);
      if (nextStep === 5) {
        generateDraftPreview();
      }
    }
  };
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleGoToStep = (t) => {
    if (t < step) setStep(t);
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        try {
          const rawData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = rawData.data;
          for (let i = 0; i < data.length; i += 4) {
            // If already significantly transparent, leave it transparent to avoid turning it black
            if (data[i + 3] < 100) {
              data[i + 3] = 0;
              continue;
            }

            const brightness =
              (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;
            if (brightness > 180) data[i + 3] = 0;
            else {
              const isBlack = formDataRef.current.signatureColor === "black";
              data[i] = isBlack ? 0 : 10;
              data[i + 1] = isBlack ? 0 : 20;
              data[i + 2] = isBlack ? 0 : 150;
              data[i + 3] = Math.max(
                0,
                Math.min(255, Math.round((255 - brightness) * 1.5)),
              );
            }
          }
          ctx.putImageData(rawData, 0, 0);
          const sigData = canvas.toDataURL("image/png");
          setFormData((prev) => {
            const updated = {
              ...prev,
              signatureImage: sigData,
              signatureType: "upload",
            };
            if (step === 5)
              setTimeout(() => generateDraftPreviewWithData(updated), 50);
            return updated;
          });
        } catch (err) {
          setFormData((prev) => {
            const updated = {
              ...prev,
              signatureImage: reader.result,
              signatureType: "upload",
            };
            if (step === 5)
              setTimeout(() => generateDraftPreviewWithData(updated), 50);
            return updated;
          });
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const generateDraftPreview = async () => {
    return generateDraftPreviewWithData(formDataRef.current);
  };

  const generateDraftPreviewWithData = async (data) => {
    setIsGeneratingDraft(true);
    try {
      const { generateW9Pdf } = await import("@/lib/pdf");
      const pdfBytes = await generateW9Pdf({
        ...data,
        address: data.street,
        cityStateZip: `${data.city}, ${data.state} ${data.zip}`,
        isDraft: !isPaid,
      });
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDraftPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (error) {
      console.error("Draft generation failed:", error);
    } finally {
      setIsGeneratingDraft(false);
    }
  };

  const handleTaxIdChange = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (formData.taxIdType === "SSN") {
      if (v.length > 9) v = v.slice(0, 9);
      if (v.length > 5)
        v = v.slice(0, 3) + "-" + v.slice(3, 5) + "-" + v.slice(5);
      else if (v.length > 3) v = v.slice(0, 3) + "-" + v.slice(3);
    } else {
      if (v.length > 9) v = v.slice(0, 9);
      if (v.length > 2) v = v.slice(0, 2) + "-" + v.slice(2);
    }
    setFormData((prev) => ({ ...prev, taxId: v }));
    setErrors((prev) => ({ ...prev, taxId: undefined }));
  };

  const sendStatusEmail = async (type) => {
    try {
      await fetch("/api/send-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          formData: { ...formDataRef.current, formId },
          type: type, // 'started' | 'success' | 'failed'
        }),
      });
    } catch (e) {
      console.error("Status email failed:", e);
    }
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    try {
      const { generateW9Pdf } = await import("@/lib/pdf");
      const pdfBytes = await generateW9Pdf({
        ...formDataRef.current,
        address: formDataRef.current.street,
        cityStateZip: `${formDataRef.current.city}, ${formDataRef.current.state} ${formDataRef.current.zip}`,
        isDraft: false,
      });
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Completed_W9_${formData.name.replace(/\s+/g, "_") || "Form"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      
      // Clear session after successful download (if paid)
      if (isPaid || paymentSuccess) {
        sessionStorage.removeItem("w9_draft");
        sessionStorage.removeItem("w9_step");
      }
    } catch (e) {
      alert("Download failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePay = async () => {
    if (!userEmail || !userEmail.includes('@')) {
       setErrors(prev => ({ ...prev, email: "Valid email is required for delivery" }));
       return;
    }
    setIsProcessing(true);
    
    // Send 'started' status email (lead capture) in background
    if (!leadEmailSent) {
      sendStatusEmail('started');
      setLeadEmailSent(true);
    }
    try {
      const res = await fetch("/api/create-order", { method: "POST" });
      const order = await res.json();
      if (!order.id) {
        alert("Failed to create order.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "EasyW9Form",
        description: "W-9 Form PDF Download",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email: userEmail,
                formData: formData,
              }),
            });

            if (verifyRes.ok) {
              setIsPaid(true);
              setPaymentSuccess(true);
              setShowCheckout(false);
              
              const blob = await verifyRes.blob();

              // Send 'success' status email (no PDF attachment)
              // Send 'success' status email (no PDF attachment)
              sendStatusEmail('success');

              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "Completed_W9_Form.pdf";
              document.body.appendChild(a);
              a.click();
              a.remove();
              URL.revokeObjectURL(url);

              // Don't clear draft yet - allow them to refresh and still see the paid state
              // until they explicitly click "Start New Form"
            } else {
              const errorText = await verifyRes.text();
              alert("Payment verification failed: " + errorText);
            }
          } catch (e) {
            alert("Verification error: " + e.message);
          }
        },
        modal: { ondismiss: () => {
          setIsProcessing(false);
          // Send 'failed' status email when user dismisses payment
          if (userEmail && userEmail.includes('@')) {
            sendStatusEmail('failed');
          }
        }},
        theme: { color: "#2563EB" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  // handleFreeDownload removed — no longer storing docs server-side

  const maskedTaxId = () => {
    const c = formData.taxId.replace(/\D/g, "");
    if (c.length < 5)
      return formData.taxIdType === "SSN" ? "•••-••-••••" : "••-•••••••";
    if (formData.taxIdType === "SSN") return "•••-••-" + c.slice(5);
    return "••-" + c.slice(2);
  };

  const getClassLabel = () => {
    if (formData.taxClassification === "Other")
      return formData.otherClassification || "Other";
    if (formData.taxClassification === "LLC")
      return `LLC (${formData.llcClassification || "?"})`;
    const o = TAX_OPTIONS.find((x) => x.value === formData.taxClassification);
    return o ? o.label : "—";
  };

  return (
    <div className="form-page">
      {showRestoreOverlay && !isInitialized && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.9)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 40, height: 40, border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary)', borderRadius: '50%', marginBottom: 16, animation: 'spin 1s linear infinite' }}></div>
          <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Restoring your session...</div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <div className={`form-layout step-${step}`}>
        <div className="form-panel">
          <div className="form-panel-header">
            <div className="form-progress">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className={`form-progress-step ${s.id < step ? "done" : ""} ${s.id === step ? "active" : ""}`}
                  onClick={() => handleGoToStep(s.id)}
                  style={{ cursor: s.id < step ? "pointer" : "default" }}
                  title={s.label}
                />
              ))}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: '#10B981' }}>
               <span style={{ fontSize: 14 }}>🛡️</span> SECURE & ENCRYPTED
            </div>
          </div>

          <div className="form-panel-body">
            <div style={{ flex: 1 }}>
              {/* MOBILE ONLY EXPERT GUIDANCE */}
              <div className="show-mobile" style={{ marginBottom: 24 }}>
                <div style={{ background: 'var(--primary-subtle)', border: '1px solid var(--primary-light)', borderRadius: 12, padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                       <span style={{ fontSize: 16 }}>💡</span>
                       <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Hint</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                       {step === 1 && "Independent contractor? Use your legal name as it appears on your 1040."}
                       {step === 2 && "Most freelancers choose Individual / Sole Proprietor."}
                       {step === 3 && "Use the address where you receive tax documents."}
                       {step === 4 && "Your SSN/EIN is processed securely in-browser."}
                       {step === 5 && "Review your form carefully before downloading."}
                    </p>
                </div>
              </div>


              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
                <div className="form-step-label" style={{ margin: 0 }}>
                  Step {step} of 5 · {STEPS[step - 1].label}
                </div>
                <button 
                  onClick={resetForm}
                  className="btn btn-outline btn-sm"
                  style={{ 
                    color: 'var(--danger)', 
                    borderColor: 'rgba(239, 68, 68, 0.2)', 
                    background: 'rgba(239, 68, 68, 0.05)',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: 4 }}><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Clear & Start Fresh
                </button>
              </div>
                <h2 className="form-step-title">{STEPS[step - 1].title}</h2>

                {step === 1 && (
                  <>
                    {/* OCR Upload Toggle */}
                    <div style={{ marginBottom: 20 }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setShowOcr(!showOcr)}
                        type="button"
                        style={{ width: "100%" }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ marginRight: 8 }}
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" x2="12" y1="3" y2="15" />
                        </svg>
                        {showOcr
                          ? "Hide"
                          : "📄 Auto-Fill from Document (Upload Image)"}
                      </button>
                      {showOcr && (
                        <DocumentUpload onDataExtracted={handleOcrData} />
                      )}
                    </div>

                    <div className="field">
                      <label className="field-label" htmlFor="name">
                        Line 1 — Full Name * <span style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', marginLeft: 8 }}>Legal Name Required</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className={`field-input ${errors.name ? "field-input-error" : ""}`}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="As shown on your income tax return"
                        autoFocus
                      />
                      <div className="field-hint">
                        For sole proprietors, enter the owner&apos;s name on
                        Line 1. <strong>Do not use a nickname.</strong>
                      </div>
                      {errors.name && (
                        <div className="field-error">{errors.name}</div>
                      )}
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="businessName">
                        Line 2 — Business / Entity Name
                        <span
                          style={{
                            fontWeight: 400,
                            color: "var(--text-muted)",
                            marginLeft: 4,
                          }}
                        >
                          (optional)
                        </span>
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        className="field-input"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="If different from Line 1"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="helper-callout">
                      <div className="helper-callout-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                      </div>
                      <p>
                        Most freelancers choose{" "}
                        <strong>Individual / Sole Proprietor</strong>. Select
                        only one box.
                      </p>
                    </div>

                    <div className="field">
                      <label className="field-label">
                        Line 3a — Federal Tax Classification *
                      </label>
                      <div className="radio-group">
                        {TAX_OPTIONS.map((opt) => (
                          <label
                            key={opt.value}
                            className={`radio-option ${formData.taxClassification === opt.value ? "selected" : ""}`}
                          >
                            <input
                              type="radio"
                              name="taxClassification"
                              value={opt.value}
                              checked={formData.taxClassification === opt.value}
                              onChange={() =>
                                handleRadio("taxClassification", opt.value)
                              }
                            />
                            <div>
                              <div style={{ fontWeight: 500 }}>{opt.label}</div>
                              <div
                                style={{
                                  fontSize: 11,
                                  color: "var(--text-muted)",
                                  marginTop: 2,
                                }}
                              >
                                {opt.hint}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.taxClassification && (
                        <div className="field-error">
                          {errors.taxClassification}
                        </div>
                      )}
                    </div>

                    {formData.taxClassification === "LLC" && (
                      <div
                        className="field"
                        style={{ animation: "slideDown 0.3s ease" }}
                      >
                        <label
                          className="field-label"
                          htmlFor="llcClassification"
                        >
                          LLC Tax Classification *
                        </label>
                        <select
                          id="llcClassification"
                          name="llcClassification"
                          className="field-select"
                          value={formData.llcClassification}
                          onChange={handleChange}
                        >
                          <option value="">Select...</option>
                          <option value="C">C — C Corporation</option>
                          <option value="S">S — S Corporation</option>
                          <option value="P">P — Partnership</option>
                        </select>
                        <div className="field-hint">
                          Enter the tax classification (C=C corporation, S=S
                          corporation, P=Partnership)
                        </div>
                        {errors.llcClassification && (
                          <div className="field-error">
                            {errors.llcClassification}
                          </div>
                        )}
                      </div>
                    )}

                    {formData.taxClassification === "Other" && (
                      <div
                        className="field"
                        style={{ animation: "slideDown 0.3s ease" }}
                      >
                        <label className="field-label">
                          Specify Other Entity Type *
                        </label>
                        <input
                          name="otherClassification"
                          className="field-input"
                          value={formData.otherClassification}
                          onChange={handleChange}
                          placeholder="e.g. Non-profit, Foreign entity"
                        />
                        <div className="field-hint">
                          Provide a brief description of the entity type.
                        </div>
                      </div>
                    )}

                    {/* Line 4: Exemptions */}
                    <div
                      style={{
                        marginTop: 12,
                        padding: "16px",
                        background: "var(--bg)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 12,
                        }}
                      >
                        <label className="field-label" style={{ margin: 0 }}>
                          Line 4 — Exemptions
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowTaxHelp(!showTaxHelp)}
                          style={{
                            background: "var(--primary-subtle)",
                            color: "var(--primary)",
                            border: "none",
                            borderRadius: "50%",
                            width: 18,
                            height: 18,
                            fontSize: 11,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 800,
                          }}
                        >
                          ?
                        </button>
                      </div>
                      {showTaxHelp && (
                        <div
                          style={{
                            fontSize: 12,
                            padding: 12,
                            background: "white",
                            border: "1px solid var(--primary-light)",
                            borderRadius: 8,
                            marginBottom: 16,
                            color: "var(--text-secondary)",
                            lineHeight: 1.5,
                            animation: "fadeIn 0.3s ease",
                          }}
                        >
                          Exemptions are generally only for entities like
                          certain corporations or non-profits. Most freelancers
                          should leave these blank.
                          <Link
                            href="https://www.irs.gov/pub/irs-pdf/fw9.pdf"
                            target="_blank"
                            style={{
                              textDecoration: "underline",
                              color: "var(--primary)",
                              marginLeft: 4,
                            }}
                          >
                            See IRS Page 3
                          </Link>
                        </div>
                      )}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 12,
                        }}
                      >
                        <div className="field" style={{ marginBottom: 0 }}>
                          <label
                            className="field-label"
                            style={{ fontSize: 11 }}
                          >
                            Exempt Payee Code
                          </label>
                          <input
                            name="exemptPayeeCode"
                            type="text"
                            className="field-input"
                            value={formData.exemptPayeeCode}
                            onChange={handleChange}
                            placeholder="If any"
                          />
                        </div>
                        <div className="field" style={{ marginBottom: 0 }}>
                          <label
                            className="field-label"
                            style={{ fontSize: 11 }}
                          >
                            FATCA Reporting Code
                          </label>
                          <input
                            name="fatcaCode"
                            type="text"
                            className="field-input"
                            value={formData.fatcaCode}
                            onChange={handleChange}
                            placeholder="If any"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="field">
                      <label className="field-label">Street Address *</label>
                      <input
                        name="street"
                        className="field-input"
                        value={formData.street}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <div className="field">
                        <label className="field-label">City</label>
                        <input
                          name="city"
                          className="field-input"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="field">
                        <label className="field-label">State</label>
                        <select
                          name="state"
                          className="field-select"
                          value={formData.state}
                          onChange={handleChange}
                        >
                          <option value="">Select State</option>
                          {US_STATES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label className="field-label">ZIP Code</label>
                      <input
                        name="zip"
                        className="field-input"
                        value={formData.zip}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">
                        Requester's Name & Address{" "}
                        <span
                          style={{
                            fontWeight: 400,
                            color: "var(--text-muted)",
                            marginLeft: 4,
                          }}
                        >
                          (optional)
                        </span>
                      </label>
                      <textarea
                        name="requesterName"
                        className="field-input"
                        value={formData.requesterName}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Name and address of person requesting the form"
                      />
                      <div className="field-hint">
                        If your client or employer provided their info for Line
                        1 of the PDF.
                      </div>
                    </div>

                    <div className="field">
                      <label className="field-label">
                        Account Number(s){" "}
                        <span
                          style={{
                            fontWeight: 400,
                            color: "var(--text-muted)",
                            marginLeft: 4,
                          }}
                        >
                          (optional)
                        </span>
                      </label>
                      <input
                        name="accountNumbers"
                        className="field-input"
                        value={formData.accountNumbers}
                        onChange={handleChange}
                        placeholder="List account numbers here (Line 7)"
                      />
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="field">
                      <label className="field-label">
                        Which Tax ID do you use? *
                      </label>
                      <div
                        className="type-toggle"
                        style={{
                          display: "flex",
                          background: "var(--bg-soft)",
                          padding: 4,
                          borderRadius: 12,
                          border: "1px solid var(--border)",
                          marginBottom: 20,
                        }}
                      >
                        <button
                          className={`toggle-btn ${formData.taxIdType === "SSN" ? "active" : ""}`}
                          onClick={() => handleRadio("taxIdType", "SSN")}
                          style={{
                            flex: 1,
                            padding: "8px",
                            border: "none",
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            background:
                              formData.taxIdType === "SSN"
                                ? "white"
                                : "transparent",
                            color:
                              formData.taxIdType === "SSN"
                                ? "var(--primary)"
                                : "var(--text-secondary)",
                            boxShadow:
                              formData.taxIdType === "SSN"
                                ? "0 2px 4px rgba(0,0,0,0.05)"
                                : "none",
                            cursor: "pointer",
                          }}
                        >
                          Individual (SSN)
                        </button>
                        <button
                          className={`toggle-btn ${formData.taxIdType === "EIN" ? "active" : ""}`}
                          onClick={() => handleRadio("taxIdType", "EIN")}
                          style={{
                            flex: 1,
                            padding: "8px",
                            border: "none",
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            background:
                              formData.taxIdType === "EIN"
                                ? "white"
                                : "transparent",
                            color:
                              formData.taxIdType === "EIN"
                                ? "var(--primary)"
                                : "var(--text-secondary)",
                            boxShadow:
                              formData.taxIdType === "EIN"
                                ? "0 2px 4px rgba(0,0,0,0.05)"
                                : "none",
                            cursor: "pointer",
                          }}
                        >
                          Business (EIN)
                        </button>
                      </div>
                    </div>
                    <div className="field" style={{ background: '#F8FAFC', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <label className="field-label" style={{ margin: 0 }}>
                          Enter your {formData.taxIdType} *
                        </label>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#10B981', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ fontSize: 14 }}>🔒</span> SECURE FIELD
                        </span>
                      </div>
                      <input
                        className="field-input"
                        style={{
                          fontSize: 18,
                          letterSpacing: 2,
                          textAlign: "center",
                          background: 'white',
                          border: '2px solid var(--primary-light)'
                        }}
                        value={formData.taxId}
                        onChange={handleTaxIdChange}
                        placeholder={
                          formData.taxIdType === "SSN"
                            ? "000-00-0000"
                            : "00-0000000"
                        }
                      />
                      <div
                        className="field-hint"
                        style={{ textAlign: "center", marginTop: 12, fontWeight: 600, color: '#475569' }}
                      >
                        🛡️ <strong>Zero-Storage:</strong> This information is processed in-browser and is <u>never</u> stored on our servers.
                      </div>
                      {errors.taxId && (
                        <div
                          className="field-error"
                          style={{ textAlign: "center" }}
                        >
                          {errors.taxId}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {step === 5 && (
                  <>
                    {paymentSuccess ? (
                      <div className="success-state">
                        <div className="success-icon">✓</div>
                        <h3>Payment Successful!</h3>
                        <p style={{ marginBottom: 24, fontSize: 14 }}>
                          Your W-9 has been generated and **sent to your email**.
                          You can also download it directly below.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <button
                              className="btn btn-primary btn-lg"
                              onClick={handleDownload}
                              disabled={isProcessing}
                            >
                               {isProcessing ? "Preparing..." : "Download Official PDF Again ↓"}
                            </button>
                            <button
                              className="btn btn-outline"
                              onClick={resetForm}
                            >
                              Start a New Form
                            </button>
                        </div>
                      </div>
                    ) : (
                      <div className="review-section">
                        {/* Mobile Preview Toggle */}
                        <div className="show-mobile" style={{ marginBottom: 24 }}>
                           <button 
                             className="btn btn-outline" 
                             style={{ width: '100%', borderStyle: 'dashed', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                             onClick={() => setShowMobilePreview(!showMobilePreview)}
                           >
                              {showMobilePreview ? "Hide Document Preview ↑" : "🔍 Show Document Preview (Mobile) ↓"}
                           </button>
                           {showMobilePreview && (
                              <div style={{ marginTop: 16, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', transform: 'scale(0.95)', transformOrigin: 'top center' }}>
                                 <W9Preview formData={formData} isPaid={isPaid} />
                                 <button 
                                   className="btn btn-sm btn-outline" 
                                   style={{ width: '100%', borderRadius: 0, border: 'none', borderTop: '1px solid var(--border)' }}
                                   onClick={() => setShowMobilePreview(false)}
                                 >
                                   Close Preview
                                 </button>
                              </div>
                           )}
                        </div>

                        <div className="field">
                          <label className="field-label">How would you like to sign? *</label>
                          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                            {['text', 'draw', 'upload'].map(t => (
                              <button
                                key={t}
                                className={`btn btn-sm ${formData.signatureType === t ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setFormData(prev => ({ ...prev, signatureType: t }))}
                                style={{ flex: 1, textTransform: 'capitalize' }}
                              >
                                {t === 'text' ? 'Type' : t === 'draw' ? 'Draw' : 'Upload'}
                              </button>
                            ))}
                          </div>

                          {formData.signatureType === 'text' && (
                            <>
                              <label className="field-label">Signer's Full Legal Name *</label>
                              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, marginTop: -8 }}>
                                Type the name of the person authorized to sign this form.
                              </div>
                              <input
                                className="field-input"
                                style={{
                                  fontFamily: formData.signatureFont === 'cursive' ? "'Dancing Script', cursive" : "inherit",
                                  fontSize: 20,
                                  color: formData.signatureColor === 'blue' ? "#1D4ED8" : "#111827",
                                }}
                                value={formData.signatureName || ""}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    signatureName: e.target.value,
                                  }))
                                }
                                placeholder="Type legal name"
                              />
                              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                                 <select 
                                   className="field-input" 
                                   style={{ flex: 1, padding: '8px' }}
                                   value={formData.signatureFont}
                                   onChange={(e) => setFormData(prev => ({ ...prev, signatureFont: e.target.value }))}
                                 >
                                    <option value="cursive">Cursive Script</option>
                                    <option value="normal">Standard Font</option>
                                 </select>
                                 <select 
                                   className="field-input" 
                                   style={{ flex: 1, padding: '8px' }}
                                   value={formData.signatureColor}
                                   onChange={(e) => setFormData(prev => ({ ...prev, signatureColor: e.target.value }))}
                                 >
                                    <option value="blue">Blue Ink</option>
                                    <option value="black">Black Ink</option>
                                 </select>
                              </div>
                            </>
                          )}

                          {formData.signatureType === 'draw' && (
                            <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: 'white' }}>
                               <div style={{ padding: '8px 12px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', background: '#F8FAFC', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                                  <span>HAND-DRAWN SIGNATURE</span>
                                  <button 
                                    onClick={() => {
                                      sigPadRef.current?.clear();
                                      setFormData(prev => ({ ...prev, signatureImage: null }));
                                    }} 
                                    style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: 10, fontWeight: 800 }}
                                  >
                                    RESET
                                  </button>
                               </div>
                               <div style={{ padding: 10 }}>
                                  <div style={{ border: '1px dashed var(--border)', borderRadius: 8 }}>
                                    <SignatureCanvas 
                                        ref={sigPadRef}
                                        penColor={formData.signatureColor === 'blue' ? '#1D4ED8' : '#111827'}
                                        canvasProps={{ width: 320, height: 120, className: 'sigCanvas' }}
                                        onEnd={() => {
                                            const img = sigPadRef.current.getTrimmedCanvas().toDataURL('image/png');
                                            setFormData(prev => ({ ...prev, signatureImage: img }));
                                        }}
                                    />
                                  </div>
                               </div>
                            </div>
                          )}

                          {formData.signatureType === 'upload' && (
                             <div className="doc-upload" style={{ margin: 0 }}>
                                <div className="doc-upload-zone" onClick={() => document.getElementById('sig-upload').click()}>
                                   <div style={{ fontSize: 24, marginBottom: 8 }}>{formData.signatureImage ? '✅' : '📁'}</div>
                                   <div style={{ fontSize: 13, fontWeight: 600 }}>{formData.signatureImage ? 'Image uploaded' : 'Click to Upload Signature'}</div>
                                   <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>PNG or JPG (transparent preferred)</div>
                                   <input id="sig-upload" type="file" hidden accept="image/*" onChange={handleSignatureUpload} />
                                </div>
                             </div>
                          )}

                          <div className="field-hint" style={{ marginTop: 12 }}>
                            Your digital signature is legally binding under the ESIGN Act.
                          </div>

                          <div style={{ marginTop: 16 }}>
                            <label className="field-label">Signature Date (Optional)</label>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, marginTop: -8 }}>
                              Leave blank to use today's date.
                            </div>
                            <input
                              type="date"
                              className="field-input"
                              value={formData.signatureDate || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  signatureDate: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="summary-box"
                          style={{
                            background: "var(--primary-subtle)",
                            padding: 20,
                            borderRadius: 16,
                            border: "1px solid var(--primary-light)",
                            marginTop: 20,
                          }}
                        >
                          <h4
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "var(--primary)",
                              textTransform: "uppercase",
                              letterSpacing: 1,
                              marginBottom: 12,
                            }}
                          >
                            Data Summary
                          </h4>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: 16,
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontSize: 11,
                                  color: "var(--text-muted)",
                                }}
                              >
                                Taxpayer
                              </div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>
                                {formData.name || "—"}
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: 11,
                                  color: "var(--text-muted)",
                                }}
                              >
                                Class
                              </div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>
                                {formData.taxClassification || "—"}
                              </div>
                            </div>
                            <div style={{ gridColumn: "span 2" }}>
                              <div
                                style={{
                                  fontSize: 11,
                                  color: "var(--text-muted)",
                                }}
                              >
                                Address
                              </div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>
                                {formData.street}, {formData.city}, {formData.state} {formData.zip}
                              </div>
                            </div>
                          </div>
                        </div>

                         <div style={{ marginTop: 24 }}>
                            {paymentSuccess ? (
                               <div style={{ animation: 'fadeIn 0.5s ease' }}>
                                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                                     <div style={{ width: 64, height: 64, background: '#DCFCE7', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32 }}>✓</div>
                                     <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Payment Successful!</h3>
                                     <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32 }}>
                                        Your W-9 has been generated and **sent to your email**. You can also download it directly from your browser.
                                     </p>
                                     <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <button 
                                          onClick={handleDownload}
                                          className="btn btn-primary btn-lg" 
                                          style={{ width: '100%' }}
                                          disabled={isProcessing}
                                        >
                                           {isProcessing ? "Preparing..." : "Download Official PDF Again ↓"}
                                        </button>
                                        <button 
                                          onClick={resetForm}
                                          className="btn btn-outline" 
                                          style={{ width: '100%' }}
                                        >
                                           Start a New Form
                                        </button>
                                     </div>
                                  </div>
                               </div>
                            ) : !isPaid ? (
                              <button
                                className="btn btn-primary btn-lg"
                                style={{ width: "100%", boxShadow: '0 10px 25px -5px rgba(37,99,235,0.4)' }}
                                onClick={() => setShowCheckout(true)}
                                disabled={isProcessing}
                              >
                                {isProcessing ? "Processing..." : "Finish & Unlock PDF →"}
                              </button>
                            ) : (
                               <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                   <div style={{ background: '#DCFCE7', color: '#166534', padding: '16px', borderRadius: 12, textAlign: 'center', fontWeight: 700, fontSize: 14 }}>
                                      ✓ Document Professionally Unlocked
                                   </div>
                                   <button 
                                      onClick={handleDownload}
                                      className="btn btn-primary btn-lg"
                                      disabled={isProcessing}
                                   >
                                      {isProcessing ? "Processing..." : "Download My Official PDF (Free)"}
                                   </button>
                                   <p style={{ fontSize: 10, textAlign: 'center', color: 'var(--text-muted)' }}>
                                       Since you've already paid for this session, you can download it for free.
                                   </p>
                               </div>
                            )}
                         </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {!paymentSuccess && (
              <div className="form-panel-footer">
                <button
                  className="btn btn-outline"
                  onClick={handlePrev}
                  disabled={step === 1}
                >
                  ← Back
                </button>
                <button className="btn btn-primary" onClick={handleNext} disabled={step === 5}>
                  {step === 5 ? "Review Completed" : "Continue →"}
                </button>
              </div>
            )}
        </div>

        <div className="preview-panel">
          <div className="preview-header">
            <div className="preview-header-title">Workspace & Preview</div>
          </div>
          <div
            className="preview-body"
            style={{ 
              background: step === 5 ? "#525659" : "#f8fafc",
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              alignItems: 'center'
            }}
          >
            {/* EXPERT CARD RE-LOCATED HERE for Desktop */}
            <div className="hide-mobile" style={{ width: '100%', maxWidth: '800px' }}>
                <div
                  className="expert-card"
                  style={{
                    background: "white",
                    borderRadius: 16,
                    padding: "24px 32px",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "var(--primary-light)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 800,
                      }}
                    >
                      !
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: "var(--primary)",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Expert Guidance
                    </div>
                    <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                      Secure Session
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      margin: 0
                    }}
                  >
                    {step === 1 && (
                      <>
                        Independent contractor? Use your <strong>legal name</strong> as it
                        appears on your 1040/tax return. Line 2 is for your business
                        brand if different.
                      </>
                    )}
                    {step === 2 && (
                      <>
                        Most freelancers and gig workers should check{" "}
                        <strong>Individual / Sole Proprietor</strong>. Corporations
                        and LLCs should select accordingly.
                      </>
                    )}
                    {step === 3 && (
                      <>
                        Provide the address where you receive tax documents.
                        The requester name is typically the company paying
                        you.
                      </>
                    )}
                    {step === 4 && (
                      <>
                        Your TIN is either your SSN or EIN. We process this
                        privately in your browser. <strong>No data is stored</strong> on
                        our servers.
                      </>
                    )}
                    {step === 5 && (
                      <>
                        Review all fields in the <strong>Live Preview</strong>. Your
                        electronic signature is legally binding under the
                        ESIGN Act.
                      </>
                    )}
                  </p>
                </div>
            </div>

            {step === 5 && draftPdfUrl ? (
              <iframe
                src={`${draftPdfUrl}#view=FitH&toolbar=0`}
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            ) : (
              <W9Preview formData={formData} isPaid={isPaid} />
            )}
          </div>
        </div>
      </div>

      {showCheckout && (
        <div
          className="checkout-overlay"
          onClick={() => setShowCheckout(false)}
        >
          <div className="checkout-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
               <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Ready to Unlock?</h3>
               <p style={{ color: 'var(--text-secondary)' }}>Enter your email to receive your official IRS W-9 PDF instantly after payment.</p>
            </div>

            <div className="field" style={{ marginBottom: 24 }}>
                <label className="field-label">Delivery Email Address</label>
                <input 
                  type="email" 
                  className="field-input" 
                  value={userEmail} 
                  onChange={(e) => setUserEmail(e.target.value)}
                  onBlur={() => {
                    if (userEmail.includes('@')) {
                      fetch("/api/save-draft", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ formId, formData, email: userEmail })
                      }).catch(() => {});
                    }
                  }}
                />
                <div className="field-hint">We'll send a confirmation email to this address.</div>
                {errors.email && <div className="field-error">{errors.email}</div>}
            </div>

            <div style={{ background: 'var(--bg-soft)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontWeight: 600 }}>Professional W-9 Form</span>
                    <span style={{ fontWeight: 900 }}>$3.99</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>One-time payment. Instant browser download. No data stored. <span style={{ textDecoration: 'line-through' }}>$4.99</span> → <strong>$3.99</strong> (limited offer)</div>
            </div>

            <button
              className="btn btn-primary btn-lg"
              style={{ width: "100%", height: 56, fontSize: 18 }}
              onClick={handlePay}
              disabled={isProcessing}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 10 }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              {isProcessing ? "Processing..." : "Pay & Download Now"}
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 16 }}>Secure SSL Encrypted Payment via Razorpay</p>
          </div>
        </div>
      )}

      {/* MOBILE FLOATING PREVIEW BUTTON */}
      {!paymentSuccess && (
        <div className="show-mobile" style={{ position: 'fixed', bottom: 80, right: 20, zIndex: 1000 }}>
           <button 
             onClick={() => setIsMobilePreviewOpen(true)}
             style={{
               width: 56,
               height: 56,
               borderRadius: '50%',
               background: 'var(--primary)',
               color: 'white',
               border: 'none',
               boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               gap: 2
             }}
           >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <span style={{ fontSize: 9, fontWeight: 800 }}>VIEW</span>
           </button>
        </div>
      )}

      {/* MOBILE PREVIEW MODAL */}
      {isMobilePreviewOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'white', 
            zIndex: 10000, 
            display: 'flex', 
            flexDirection: 'column',
            animation: 'fadeIn 0.3s ease'
          }}
        >
           <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-soft)' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)' }}>LIVE FORM PREVIEW</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Step {step} of 5 — {STEPS[step-1].label}</div>
              </div>
              <button 
                onClick={() => setIsMobilePreviewOpen(false)}
                className="btn btn-sm btn-outline"
                style={{ borderRadius: 100, padding: '8px 16px' }}
              >
                Close ✕
              </button>
           </div>
           <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: '#525659' }}>
              <div style={{ transform: 'scale(1)', transformOrigin: 'top center' }}>
                <W9Preview formData={formData} isPaid={isPaid} />
              </div>
              <div style={{ height: 40 }} />
           </div>
           <div style={{ padding: 16, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <button 
                onClick={() => setIsMobilePreviewOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Back to Editing
              </button>
           </div>
        </div>
      )}
    </div>
  );
}

function W9Preview({ formData, isPaid }) {
  const taxIdClean = formData.taxId.replace(/\D/g, "");
  const ssnDigits = formData.taxIdType === "SSN" ? taxIdClean.split("") : [];
  const einDigits = formData.taxIdType === "EIN" ? taxIdClean.split("") : [];

  return (
    <div className="w9-preview">
      {!isPaid && (
        <div className="w9-preview-watermark">
           <span style={{ fontSize: 48 }}>EASYW9FORM</span>
           <span style={{ fontSize: 24, opacity: 0.8 }}>SAMPLE PREVIEW</span>
        </div>
      )}

      {/* Header */}
      <div className="w9-header">
        <div className="w9-header-left">
          <div className="w9-form-label">Form</div>
          <div className="w9-form-title">W-9</div>
          <div className="w9-form-subtitle">
            Request for Taxpayer
            <br />
            Identification Number and Certification
          </div>
          <div className="w9-form-dept">
            Department of the Treasury — Internal Revenue Service
          </div>
          <div className="w9-form-link">
            ▸ Go to www.irs.gov/FormW9 for instructions and the latest
            information.
          </div>
        </div>
        <div className="w9-header-right">
          Give Form to the
          <br />
          requester. Do not
          <br />
          send to the IRS.
        </div>
      </div>

      {/* Line 1 */}
      <div className="w9-row">
        <div className="w9-row-label">
          1&nbsp; Name (as shown on your income tax return)
        </div>
        <div className={`w9-row-value ${formData.name ? "" : "empty"}`}>
          {formData.name || "Your name will appear here"}
        </div>
      </div>

      {/* Line 2 */}
      <div className="w9-row">
        <div className="w9-row-label">
          2&nbsp; Business name/disregarded entity name, if different from above
        </div>
        <div className={`w9-row-value ${formData.businessName ? "" : "empty"}`}>
          {formData.businessName || "—"}
        </div>
      </div>

      {/* Line 3: Tax Classification */}
      <div className="w9-tax-section">
        <div className="w9-row-label" style={{ marginBottom: 6 }}>
          3a&nbsp; Check appropriate box for federal tax classification
        </div>
        <div className="w9-classification-options">
          {[
            { key: "Individual", label: "Individual/sole proprietor" },
            { key: "C-Corp", label: "C Corporation" },
            { key: "S-Corp", label: "S Corporation" },
            { key: "Partnership", label: "Partnership" },
            { key: "Trust", label: "Trust/estate" },
            { key: "LLC", label: "LLC" },
            { key: "Other", label: "Other" },
          ].map((item) => (
            <div key={item.key} className="w9-classification-option">
              <div
                className={`w9-checkbox ${formData.taxClassification === item.key ? "checked" : ""}`}
              >
                {formData.taxClassification === item.key ? "✓" : ""}
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        {formData.taxClassification === "LLC" && formData.llcClassification && (
          <div style={{ marginTop: 4, fontSize: 10, color: "var(--primary)" }}>
            Tax classification: {formData.llcClassification}
          </div>
        )}
        {formData.taxClassification === "Other" &&
          formData.otherClassification && (
            <div
              style={{ marginTop: 4, fontSize: 10, color: "var(--primary)" }}
            >
              {formData.otherClassification}
            </div>
          )}
      </div>

      {/* Line 4: Exemptions */}
      <div className="w9-row">
        <div className="w9-row-label">4&nbsp; Exemptions</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            fontSize: 9,
            padding: "2px 12px 4px",
            gap: 8,
          }}
        >
          <div>
            <span style={{ color: "#666" }}>Exempt payee code: </span>
            <span style={{ color: "var(--primary)", fontWeight: 500 }}>
              {formData.exemptPayeeCode || "—"}
            </span>
          </div>
          <div>
            <span style={{ color: "#666" }}>FATCA code: </span>
            <span style={{ color: "var(--primary)", fontWeight: 500 }}>
              {formData.fatcaCode || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Line 5 */}
      <div
        className="w9-row"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <div style={{ borderRight: "1px solid #999" }}>
          <div className="w9-row-label">
            5&nbsp; Address (number, street, apt. or suite no.)
          </div>
          <div className={`w9-row-value ${formData.street ? "" : "empty"}`}>
            {formData.street || "Street address"}
          </div>
        </div>
        <div>
          <div className="w9-row-label">
            Requester's name and address (optional)
          </div>
          <div
            className={`w9-row-value ${formData.requesterName ? "" : "empty"}`}
            style={{ fontSize: 10 }}
          >
            {formData.requesterName || "—"}
          </div>
        </div>
      </div>

      {/* Line 6 */}
      <div className="w9-row">
        <div className="w9-row-label">6&nbsp; City, state, and ZIP code</div>
        <div className={`w9-row-value ${formData.city ? "" : "empty"}`}>
          {formData.city
            ? `${formData.city}, ${formData.state} ${formData.zip}`
            : "City, State ZIP"}
        </div>
      </div>

      {/* Line 7 */}
      <div className="w9-row">
        <div className="w9-row-label">
          7&nbsp; List account number(s) here (optional)
        </div>
        <div
          className={`w9-row-value ${formData.accountNumbers ? "" : "empty"}`}
        >
          {formData.accountNumbers || "—"}
        </div>
      </div>

      {/* Part I: TIN */}
      <div className="w9-tin-section">
        <div className="w9-tin-header">
          Part I&nbsp;&nbsp; Taxpayer Identification Number (TIN)
        </div>
        <div className="w9-tin-row">
          <div className="w9-tin-box">
            <label>Social security number</label>
            <div className="w9-tin-digits">
              {[0, 1, 2].map((i) => (
                <div key={`s${i}`} className="w9-tin-digit">
                  {formData.taxIdType === "SSN" && ssnDigits[i] ? "•" : ""}
                </div>
              ))}
              <div className="w9-tin-separator">-</div>
              {[3, 4].map((i) => (
                <div key={`s${i}`} className="w9-tin-digit">
                  {formData.taxIdType === "SSN" && ssnDigits[i] ? "•" : ""}
                </div>
              ))}
              <div className="w9-tin-separator">-</div>
              {[5, 6, 7, 8].map((i) => (
                <div key={`s${i}`} className="w9-tin-digit">
                  {formData.taxIdType === "SSN" && ssnDigits[i] ? "•" : ""}
                </div>
              ))}
            </div>
          </div>
          <div className="w9-tin-box">
            <label>Employer identification number</label>
            <div className="w9-tin-digits">
              {[0, 1].map((i) => (
                <div key={`e${i}`} className="w9-tin-digit">
                  {formData.taxIdType === "EIN" && einDigits[i] ? "•" : ""}
                </div>
              ))}
              <div className="w9-tin-separator">-</div>
              {[2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={`e${i}`} className="w9-tin-digit">
                  {formData.taxIdType === "EIN" && einDigits[i] ? "•" : ""}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="w9-sign-section">
        <div className="w9-row-label">
          Part II — Certification · Signature of U.S. person
        </div>
        <div className="w9-signature-line">
          {formData.signatureName || formData.name || ""}
        </div>
        <div
          style={{
            fontSize: 8,
            color: "#666",
            marginTop: 4,
            textAlign: "right",
          }}
        >
          Date: {new Date().toLocaleDateString("en-US")}
        </div>
      </div>
    </div>
  );
}

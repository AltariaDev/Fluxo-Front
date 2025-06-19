import { Dispatch, SetStateAction, useState } from "react";
import {
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Captions,
  Bug,
  Lightbulb,
  HelpCircle,
  Star,
} from "lucide-react";
import InputModal from "@/components/Reusable/InputModal";
import Button from "@/components/Reusable/Button";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { useTranslations } from "next-intl";

interface ContactForm {
  title: string;
  name: string;
  email: string;
  message: string;
  type: string;
  priority: "low" | "medium" | "high";
  attachments?: File[];
}

interface ModalContactProps {
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  profile: ProfileType | null;
}

export default function ModalContact({
  setIsOpen,
  profile,
}: ModalContactProps) {
  const [form, setForm] = useState<ContactForm>({
    title: "",
    name: profile?.user.fullname || "",
    email: profile?.user?.email || "",
    message: "",
    type: "general",
    priority: "medium",
  });

  const [errors, setErrors] = useState<
    Partial<{
      title: string;
      name: string;
      email: string;
      message: string;
      type: string;
      priority: "low" | "medium" | "high";
      attachments: string;
    }>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const t = useTranslations("Common");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bug":
        return <Bug className="text-red-500" />;
      case "idea":
        return <Lightbulb className="text-yellow-500" />;
      case "help":
        return <HelpCircle className="text-blue-500" />;
      case "feedback":
        return <Star className="text-purple-500" />;
      default:
        return <MessageSquare className="text-primary-500" />;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<{
      title: string;
      name: string;
      email: string;
      message: string;
      type: string;
      priority: "low" | "medium" | "high";
      attachments: string;
    }> = {};

    if (!form.title.trim()) {
      newErrors.title = t("errors.titleRequired");
    }

    if (!form.message.trim()) {
      newErrors.message = t("errors.messageRequired");
    }

    if (form.attachments && form.attachments.length > 3) {
      newErrors.attachments = t("errors.maxAttachments");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormField = <K extends keyof ContactForm>(
    field: K,
    value: ContactForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      updateFormField("attachments", files);
    }
  };

  const handleSend = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setServerError(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "attachments" && value) {
          value.forEach((file: File) => {
            formData.append("attachments", file);
          });
        } else {
          formData.append(key, value as string);
        }
      });

      const res = await fetch("api/send-contact", {
        method: "POST",
        body: formData,
      });
      console.log(form);

      if (res.ok) {
        setSuccessMessage(t("success.messageSent"));
        setTimeout(() => {
          setIsOpen({ text: "" });
        }, 3000);
      } else {
        const error = await res.json();
        setServerError(error.message || t("errors.sendFailed"));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setServerError(t("errors.sendFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary-500">
          {t("contact.title")}
        </h2>
        {getTypeIcon(form.type)}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputModal
          placeholder={t("contact.titlePlaceholder")}
          type="text"
          icon={<Captions />}
          onChange={(e) => updateFormField("title", e.target.value)}
        />

        <select
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={form.priority}
          onChange={(e) =>
            updateFormField(
              "priority",
              e.target.value as "low" | "medium" | "high"
            )
          }
        >
          <option value="low">{t("priority.low")}</option>
          <option value="medium">{t("priority.medium")}</option>
          <option value="high">{t("priority.high")}</option>
        </select>
      </div>

      {errors.title && (
        <div className="flex items-center gap-1 text-red-500 text-xs -mt-3 ml-1">
          <AlertCircle size={12} />
          <span>{errors.title}</span>
        </div>
      )}

      <label
        className="text-sm text-gray-600 font-semibold mt-2"
        htmlFor="contact-message"
      >
        {t("contact.messagePlaceholder")}
      </label>
      <textarea
        id="contact-message"
        className="w-full min-h-[120px] max-h-[300px] p-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-base resize-vertical bg-white shadow-sm mb-2"
        value={form.message}
        onChange={(e) => updateFormField("message", e.target.value)}
        placeholder={t("contact.messagePlaceholder")}
        required
      />
      {errors.message && (
        <div className="flex items-center gap-1 text-red-500 text-xs -mt-3 ml-1">
          <AlertCircle size={12} />
          <span>{errors.message}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">
          {t("contact.attachments")} ({form.attachments?.length || 0}/3)
        </label>
        <input
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {errors.attachments && (
          <div className="flex items-center gap-1 text-red-500 text-xs">
            <AlertCircle size={12} />
            <span>{errors.attachments}</span>
          </div>
        )}
      </div>

      {serverError && (
        <div className="flex items-center gap-2 text-red-500 text-sm px-2">
          <AlertCircle size={16} />
          <span>{serverError}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2 text-green-500 text-sm px-2">
          <CheckCircle2 size={16} />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          button="secondary"
          size="compact"
          onClick={() => setIsOpen({ text: "" })}
        >
          {t("cancel")}
        </Button>
        <Button
          type="button"
          size="compact"
          button="primary"
          onClick={handleSend}
        >
          {isLoading ? t("sending") : t("send")}
        </Button>
      </div>
    </div>
  );
}

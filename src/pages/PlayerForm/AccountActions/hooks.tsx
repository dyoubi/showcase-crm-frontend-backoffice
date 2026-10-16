import {
  useSendPlayerPasswordResetEmail,
  useSendPlayerVerificationEmail,
} from '@/domains/casino/player';
import { useToaster, useTriggerConfirmationModal } from '@/hooks';
import { IconDanger, IconEmail } from '@/shared/Icons';
import { ReactNode } from 'react';
interface SendParams {
  email?: string;
  onConfirm?: () => void;
}

interface ConfirmActionsProps {
  confirmText: string;
  content: ReactNode;
  onConfirm?: () => void;
  title: string;
}

export const useConfirmAction = () => {
  const triggerConfirmationModal = useTriggerConfirmationModal();

  return ({ confirmText, content, onConfirm, title }: ConfirmActionsProps) =>
    triggerConfirmationModal({
      icon: IconDanger,
      width: 480,
      title,
      confirmText,
      content,
      onConfirm,
    });
};

export const useConfirmEmailSend = () => {
  const triggerConfirmationModal = useTriggerConfirmationModal();

  return ({ email = '', onConfirm }: SendParams) =>
    triggerConfirmationModal({
      icon: IconEmail,
      width: 480,
      title: 'Warning',
      confirmText: 'Send Email',
      content: (
        <>
          <p style={{ margin: 0 }}>
            Please verify that the following email address is correct:
          </p>

          <p>
            <pre style={{ margin: 0 }}>
              <strong>
                {email}
              </strong>
            </pre>
          </p>
        </>
      ),
      onConfirm,
    });
};

export const useHandleSendEmail = () => {
  const toaster = useToaster();

  const { mutateAsync: sendPlayerVerificationEmail } = useSendPlayerVerificationEmail();
  const { mutateAsync: sendPlayerPasswordResetEmail } = useSendPlayerPasswordResetEmail();

  const emailSuccessToaster = () => {
    toaster({ content: 'Email sent successfully', displayIcon: true, color: 'success' });
  };

  const emailFailureToaster = () => {
    toaster({ content: 'Error sending email', displayIcon: true, color: 'warning' });
  };

  const handleSendVerificationEmail = async (email: string) => {
    try {
      await sendPlayerVerificationEmail(email);
      emailSuccessToaster();
    } catch (error) {
      emailFailureToaster();
    }
  };

  const handleSendPasswordResetEmail = async (email: string) => {
    try {
      await sendPlayerPasswordResetEmail(email);
      emailSuccessToaster();
    } catch (error) {
      emailFailureToaster();
    }
  };

  return {
    handleSendVerificationEmail,
    handleSendPasswordResetEmail,
  };
};

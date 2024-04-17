import StyledPopUpOverlay from "@/components/StyledComponents/StyledPopUpOverlay";
import StyledPopUpContent from "@/components/StyledComponents/StyledPopUpContent";
import StyledConfirmButtonWrapper from "@/components/StyledComponents/StyledConfirmButtonWrapper";
import StyledConfirmPopUpButton from "@/components/StyledComponents/StyledConfirmPopUpButton";

export default function ConfirmationPopup({
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}) {
  return (
    <StyledPopUpOverlay>
      <StyledPopUpContent>
        <p>{message}</p>
        <StyledConfirmButtonWrapper>
          {onConfirm != null && (
            <StyledConfirmPopUpButton onClick={onConfirm}>
              {confirmText ? confirmText : "Confirm"}
            </StyledConfirmPopUpButton>
          )}
          {onCancel != null && (
            <StyledConfirmPopUpButton $red onClick={onCancel}>
              {cancelText ? cancelText : "Cancel"}
            </StyledConfirmPopUpButton>
          )}
        </StyledConfirmButtonWrapper>
      </StyledPopUpContent>
    </StyledPopUpOverlay>
  );
}

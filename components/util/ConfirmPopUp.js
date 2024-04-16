import styled from "styled-components";
import StyledButton from "../StyledComponents/StyledButton";

import StyledPopUpOverlay from "@/components/StyledComponents/StyledPopUpOverlay";
import StyledPopUpContent from "@/components/StyledComponents/StyledPopUpContent";

const ConfirmPopUpButton = styled(StyledButton)`
  margin: 0 8px;
  background-color: ${({ $red }) => $red && "red"};
  cursor: pointer;
`;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

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
        <ConfirmButtonWrapper>
          {onConfirm != null && (
            <ConfirmPopUpButton onClick={onConfirm}>
              {confirmText ? confirmText : "Confirm"}
            </ConfirmPopUpButton>
          )}
          {onCancel != null && (
            <ConfirmPopUpButton $red onClick={onCancel}>
              {cancelText ? cancelText : "Cancel"}
            </ConfirmPopUpButton>
          )}
        </ConfirmButtonWrapper>
      </StyledPopUpContent>
    </StyledPopUpOverlay>
  );
}

import styled from "styled-components";
import StyledButton from "../StyledComponents/StyledButton";

const ConfirmPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  //the height of the Z index should ensure that this popup is always the top element.
  //Since we work with the z-index in steps of 10, I have chosen 100 here.
  z-index: 100;
`;

const ConfirmPopupContent = styled.div`
  background-color: var(--background-color);
  padding: 15px;
  max-width: 90vw;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  text-align: center;
`;

const ConfirmPopUpButton = styled(StyledButton)`
  margin: 0 8px;
  background-color: ${({ red }) => (red ? "red" : "var(--accent-color)")};
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
    <ConfirmPopupOverlay>
      <ConfirmPopupContent>
        <p>{message}</p>
        <ConfirmButtonWrapper>
          <ConfirmPopUpButton onClick={onConfirm}>
            {confirmText ? confirmText : "Confirm"}
          </ConfirmPopUpButton>
          <ConfirmPopUpButton red onClick={onCancel}>
            {cancelText ? cancelText : "Cancel"}
          </ConfirmPopUpButton>
        </ConfirmButtonWrapper>
      </ConfirmPopupContent>
    </ConfirmPopupOverlay>
  );
}

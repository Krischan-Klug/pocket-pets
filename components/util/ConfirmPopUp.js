import styled from "styled-components";

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
  z-index: 100;
`;

const ConfirmPopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: black;
  text-align: center;
`;

const ConfirmPopUpButton = styled.button`
  padding: 8px 16px;
  margin: 0 8px;
  border: none;
  border-radius: 4px;
  background-color: ${({ red }) => (red ? "red" : "#007bff")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
  cursor: pointer;
  transform: scale(1);
  transition: 0.5s;

  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }
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
        <ConfirmPopUpButton onClick={onConfirm}>
          {confirmText ? confirmText : "Confirm"}
        </ConfirmPopUpButton>
        <ConfirmPopUpButton red onClick={onCancel}>
          {cancelText ? cancelText : "Cancel"}
        </ConfirmPopUpButton>
      </ConfirmPopupContent>
    </ConfirmPopupOverlay>
  );
}

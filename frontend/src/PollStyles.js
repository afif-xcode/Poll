import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 32px;
  max-width: 500px;
  margin: 40px auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const Header = styled.div`
  margin-bottom: 24px;
`;

export const QuestionNumber = styled.h5`
  color: #888;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 8px 0;
  font-weight: 600;
`;

export const QuestionTitle = styled.h3`
  color: #333;
  font-size: 1.5rem;
  margin: 0;
  line-height: 1.3;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
  margin-left: 4px;
`;

export const StyledInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  transition: all 0.2s ease-in-out;
  background-color: #fafafa;

  &:focus {
    outline: none;
    border-color: #1976d2;
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #eee;
  margin: 24px 0;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  background-color: ${(props) =>
    props.variant === "save" ? "#1976d2" : "#f5f5f5"};
  color: ${(props) => (props.variant === "save" ? "#ffffff" : "#333")};

  &:hover {
    background-color: ${(props) =>
      props.variant === "save" ? "#1565c0" : "#e0e0e0"};
    transform: translateY(-1px);
  }
`;

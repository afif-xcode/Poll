import styled from "styled-components";
import { Link } from "react-router-dom";

// Base styles shared between button and link
const baseStyles = `
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  ${baseStyles}

  /* Primary Variant (Blue) */
  background-color: ${({ theme, variant }) =>
    variant === "primary"
      ? theme.colors.primary
      : variant === "danger"
      ? theme.colors.dangerBg
      : "#f5f5f5"};

  color: ${({ theme, variant }) =>
    variant === "primary"
      ? theme.colors.text.light
      : variant === "danger"
      ? theme.colors.danger
      : theme.colors.text.primary};

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "primary"
        ? theme.colors.primaryHover
        : variant === "danger"
        ? theme.colors.dangerHover
        : "#e0e0e0"};
    transform: translateY(-1px);
  }
`;

export const LinkButton = styled(Link)`
  ${baseStyles}
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text.light};
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

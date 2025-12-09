import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ padding }) => padding || "24px"};
  transition: all 0.2s ease;

  &:hover {
    transform: ${({ hover }) => (hover ? "translateY(-4px)" : "none")};
    box-shadow: ${({ theme, hover }) =>
      hover ? theme.shadows.cardHover : theme.shadows.card};
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
`;

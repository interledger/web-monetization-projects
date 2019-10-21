import styled from 'styled-components'

export const Container = styled.div<{ blend?: true }>`
  padding-right: ${({ theme }) => theme.spacing(2)}px;
  padding-left: ${({ theme }) => theme.spacing(2)}px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  text-align: center;
  max-width: ${({ theme }) => theme.breakpoints.values.lg}px;
  ${({ theme }) => theme.breakpoints.down('lg')} {
    ${({ blend }) => blend && 'padding: 0;'}
  }
`

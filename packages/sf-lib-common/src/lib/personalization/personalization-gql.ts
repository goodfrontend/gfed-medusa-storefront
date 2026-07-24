import { gql } from '@apollo/client';

export const SEND_SIGNAL_MUTATION = gql`
  mutation SendSignal($input: SignalInput!) {
    sendSignal(input: $input) {
      success
      profileUpdated
    }
  }
`;

export const SUBMIT_CONVERSION_MUTATION = gql`
  mutation SubmitConversion($input: ConversionInput!) {
    submitConversion(input: $input)
  }
`;

export const ADK_SEND_SIGNAL_MUTATION = gql`
  mutation AdkSendSignal($input: SignalInput!) {
    adkSendSignal(input: $input) {
      success
      profileUpdated
    }
  }
`;

export const PERSONALIZE_QUERY = gql`
  query Personalize($input: SurfaceContext!, $deviceId: String!) {
    personalize(input: $input, deviceId: $deviceId) {
      components {
        component
        contentId
        propsOverrides
        priority
        reasoning
        score
      }
      reasoning {
        intent
        confidence
        factors
        modelVersion
      }
      cacheKey
      servedAt
    }
  }
`;


export const ADK_PERSONALIZE_QUERY = gql`
  query AdkPersonalize($input: SurfaceContext!, $deviceId: String!) {
    adkPersonalize(input: $input, deviceId: $deviceId) {
      components {
        component
        contentId
        propsOverrides
        priority
        reasoning
        score
      }
      reasoning {
        intent
        confidence
        factors
        modelVersion
      }
      cacheKey
      servedAt
    }
  }
`;

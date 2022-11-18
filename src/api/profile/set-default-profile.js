import { gql } from "@apollo/client";

export const CREATE_DEFAULT_PROFILE = gql`
  mutation ($request: CreateSetDefaultProfileRequest!) {
    createSetDefaultProfileTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetDefaultProfileWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          wallet
          profileId
        }
      }
    }
  }
`;

## Introduction

generalSSO is a graphical interface for manually testing Single Sign-On (SSO) requests to Zendesk. The application makes no attempt to ensure that requests are correct (for troubleshooting it's at least as important to be able to construct invalid requests as it is to construct valid requests). The application supports JWT and SAML authentication strategies.

## JWT

At a bare minimum, a JWT payload requires the following:

- `Hostname`
- `Shared secret` (from **Settings > Security > SSO > JWT** in Zendesk)
- `IAT`
- `JTI`
- `Name`
- `Email`

[Zendesk documentation for JWT](https://support.zendesk.com/entries/23675367-Setting-up-single-sign-on-with-JWT-JSON-Web-Token-)
## SAML

Zendesk requires that the fingerprint of the certificate used to sign SAML assertions be entered under  **Settings > Security > SSO > JWT**.

At a bare minimum, a SAML response should contain:

- `Certificate`
- `Key`
- `Destination hostname`
- `IssueInstant`
- `Response ID`
- `NameID` (email address)
- `Givenname`
- `Surname`

[Zendesk documentation for SAML](https://support.zendesk.com/entries/514714-Using-SAML-for-single-sign-on-Plus-and-Enterprise-)

## Live demo

See a live demo at [https://generals.so](https://generals.so). Don't use the demo to authenticate against production accounts!

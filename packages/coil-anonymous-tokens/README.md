# Anonymous Tokens

> Tools to acquire and keep track of anonymous auth tokens

Uses new Coil services to generate anonymous auth tokens. Coil signs them with
a blind signature so that they don't learn what the token is, but can still
validate it later. The auth tokens are used later to let you browse Web
Monetized sites without revealing who you are. That way Coil learns neither the
site's identity (due to the ILP address encryption) nor the user's identity.

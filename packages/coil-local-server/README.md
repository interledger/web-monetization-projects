# Coil Local Server

Whenever the extension sees a payment pointer on a page, instead of doing a
request to that URL, the extension creates a request to the local server,
sending along the payment pointer.

If the server's configuration
(perhaps a json file checked on startup, probably easier than having a UI)
listed that payment pointer for mocking, then it could mock the payment pointer
and return the stream secrets.

If the server's config DOES NOT have the payment pointer configured, then
perhaps it would just proxy to the actual payment pointer?
What would the point of that be?
Wouldn't it make things more complicated in terms of UI?
Don't you want to be able to list payment pointer balances?
Perhaps still could list them anyway,
just the amounts sent

            How would it know ?
                Would the mock server actually create a connection to coil?
                    Would a btpToken be required?
                    Stop/start functionality like is currently implemented?

                    Seems complicated
                    Probably better to just mock out ALL the payment pointers
                        and always connect to it via BTP too
                        Then can track

            How about this:

            The extension queries the local server first
            If it's configured to

            What is the scope of the local server?
                everything?
                    What are the endpoints that anon tokens uses?
                    /redeemer
                    /issuer

                    /gateway
                        need a graphql server/resolver

                    /btp
                        need a btp server
                        // https://snyk.io/advisor/npm-package/ilp-plugin-mini-balances
                        // https://github.com/interledger-deprecated/ilp-plugin-mini-balances/blob/master/index.js

                Is this a waste of effort?
                    It would be useful but is it a priority?
                Is time better spent on OP related?

Ideally this could work completely offline so would need to also provide mock
anonymous token support.
TODO:
make it injectable

Would need an SPSP service.
BuilConfig.connectToMock

Using:
@interledger/stream-receiver

It could have a frontend, live updated with the live balances.

Question:
Does TB support more than one currency ?

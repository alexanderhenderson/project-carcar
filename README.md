# CarCar

Team:

* Alexander Henderson - Services Microservice
* Howard Yuan - Sales microservice

## Design

See diagram in main directory

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The sales api contains three groupings: the customers, the salespeople, and the sales themselves. The create a sale record pulls in customer info from the customer creation, and salespeople from the create salesperson, as well as the price input directly, and the VIN that's brought in through the poller carried in the automobileVO set up there. The sales can be listed by salespeople by filtering for the associated salespeople within the sales data. The main link with the inventory in sales would be the VIN that's stored in the automobile data.
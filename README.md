# CarCar

Team:

* Alexander Henderson - Services Microservice
* Howard Yuan - Sales microservice

## How to load project:

    Nothing too special to run the project.

    Clone the gitlab repository, and then checkout the branch named "main-branch"
        ("main" branch we forked was protected so we could not change or delete it)

    Run the following docker commands in the cloned directory *after* changing branches:
        "docker-compose build"
        "docker-compose up"

    

## Design

To start, we included a png of our design diagram inside the main PROJECT-BETA directory. It is called:
ProjectBetaBoundedContext.png

We created an excalidraw diagram to lay out our bounded contexts and determine how our front/backend/services
would look and communicate at a high level. The diagram and connections evolved as the project progressed and
we were able to flush out how things would work, but our final diagream more or less represents how we laid it 
out at the start.

We broke the problem domain down into 3 main sections:
    The inventory
    Service
    Sales

Inventory contains the Inventory API, and the front end pages that we would create first. 

Service contains the Service API Microservice, the Service poller Microservice, and the related front end pages

Sales contins the Sales API Microservice, the Sakes poller Microservice, and the realted fron end pages.

We also decided to encapsulte all of the front end pages in a "front end" context boundary - and anything not inside that
bounded context would be considered the backend (the database also exists, but since we are using SQLlight decided it wasn't
a meningful thing to add to our design diagram.)

When creating the inventory pages, we split the work 50/50 (the names of the pages/etc differ slightly from
the list shown below)
    Alexander Henderson created:
        -Show list of manufcturers
        -Create a manufacturer
        -Create an automobile in inventory

    Howard Yuan created:
        -Show list of vehicle models
        -Create a vehicle model
        -Show a list of automobiles in inventory

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
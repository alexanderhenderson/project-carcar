# CarCar

Team:

* Alexander Henderson - Services Microservice
* Howard Yuan - Sales microservice

## How to load project:

    Nothing too special to run the project.

    Clone the gitlab repository, and then checkout the branch named "main-branch"
        ("main" branch we forked was protected so it appeared that we could not change or delete it)

    Run the following docker commands in the cloned directory *after* changing branches:
        "docker-compose build"
        "docker-compose up"

    Migrate both of the django microservices in their respective docker containers after running the bash command

    ***testing for Record a new sale must be done with the CR-V automobile.***

    

## Design

To start, we included a png of our design diagram inside the top level PROJECT-BETA directory. It is called:
ProjectBetaBoundedContext.png

We created an excalidraw diagram (mentioned above) to lay out our bounded contexts and determine how our front/backend/services
would look and communicate at a high level. The diagram and connections evolved as the project progressed and
we were able to flush out how things would work, but our final diagream more or less represents how we laid it 
out at the start.

We broke the problem domain down into 3 main sections:
    The inventory
    Service
    Sales

Inventory: contains the Inventory API, and the front end pages that we would create first. 

Service: contains the Service API Microservice, the Service poller Microservice, and the related front end pages

Sales: contins the Sales API Microservice, the Sakes poller Microservice, and the realted fron end pages.

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

## Service microservice - Alexander Henderson

    I started by creating the models I thought we would need to store all the information needed by the front end. There
    were 3 - Technician, Appointment and AutomobilesVO to hold the data from the inventory model from the Inventory 
    microservice. 

    Technician was self explanatory. It has a name and employee number field. 

    Appointment was also fairly simple - it has all the field required by the project (owner, data, time... etc) and a
    single foreignkey to the technician (I decided to do models.PROTECT on deletion since we don't want to delete the tech 
    if Appointment they are assigned to is deleted, and since being able to delete a tech was not a project requirment). The
    only field I added after intially creating the model was a "copleted" field, which made it easier to filter completed/
    incompleted appointments from the front page. 

    Initially I made the AutomobilesVO will all of the fields from the model it was a virtual object copy of (Automobile in the
    inventory api inventory_rest models), but eventually decided to only keep the vin field. One of our front end pages needs 
    to show if someone who bought a car that was in our inventory so that we can give them a discount, and I figured we could 
    do that by just comparing the vin of the car in the appointment to a list of vins that were at our inventory at some point 
    (the vins in the AutomobilesVO model are never deleted, so even if Automobile model vins are deleted (like if a automobile 
    is sold), the vins in the AutomobilesVO do not).

    The Views / API calls were fairly striaghtforward. I started by creating a JS/React page, and then would go into the 
    microservice views to build whatever api calls the front end called for. Having the Excalidraw diagrams made this much
    easier. Most of the api calls / json requests were fairly simple, a few required data modification/filtering or additional
    work to add a referenced model instance.

    The polling was fairly simple. It is still the same server connection we used in the practice project, and was very similar.
    All it was polling for was the vin field from inventory.api.inventory_rest Automobile model. 

    The JS/React pages were fun to build but a bit challenging. 2 of the pages (Enter a service appointment and Create/Enter a Technician)
    were very straightforward and similar to things we have made before. However, for the other two pages we had never filtered data from 
    fetch requests before, so that was an interesting experience. One page requred us to filter for service appointments that had been
    completed and matched a vin we searched (this was the Service History page) and the other was slightly simpler, showing a list of
    all scheduled appointments that had not yet been completed (this page required us to be able to mark a appointment as completed or
    delete it, but that was fairly simple compared to filtering the data from get requests to our microservice).

## Sales microservice - Howard Yuan

The sales api contains three groupings: the customers, the salespeople, and the sales themselves. The create a sale record pulls in customer info from the customer creation, and salespeople from the create salesperson, as well as the price input directly, and the VIN that's brought in through the poller carried in the automobileVO set up there. The sales can be listed by salespeople by filtering for the associated salespeople within the sales data. The main link with the inventory in sales would be the VIN that's stored in the automobile data.
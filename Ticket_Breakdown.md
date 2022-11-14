# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function ` ` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


### Ticket 1 - Create AgentCustomID service

Context: We need to develop a new DB model and endpoint in order to storage/handle custom ids for each agent into each Facility. This new service should allow us to save a defined string which will be the custom id that each facility will want to use to identify each agent.

A.C

1. The model allow us to storage a string for the custom id of the agent.
2. The model allow us to relate the facility id with the agent id (both as keys for each row of data).
3. The model allow us to storage multiple custom-id for agent but only one custom id per facility per agent.
4. The endpoints allow us to create, edit and delete customs id for agents.
5. The endpoint can only be used by users with the proper permissions (facility administrator).
6. The development includes tests.
7. The model and endpoint is well documented.

Estimates

This will be the job of a backend engineer, which will create the model and the services to handle this information. Prob this is going to take a couple of days because this should include documentation, tests, a new model and endpoints to handle this data.


### Ticket 2 - Add custom id into the agents tab

This considers that we have a platform where our clients can access and see the list of agents that worked in their facility. Something where they can manage agents, see the occupied shift, define availability, etc, etc.

This also considers that we have an UI KIT to handle tables, input, and all the common UI needs inside the platform.

Context: We need to have a new feature where the customer can add a custom id into each agent in their agents tab, in that way, we can use this id to generate custom reports with the desired id. This task is the visual part which will support the input of this new data, sending it to the backend through the services that we defined before.

A.C

1. Users can define a custom id into each agent that goes into their facility
2. User can only define one custom id per facility.
3. The custom id can't have any special caracter.
4. The development consider all the languages defined in the platform, so all the proper traductions are included.
5. The development is according to the design definition in the figma.
6. When the user edit a user and add the custom id the data is sent into the backend and updated automatically
7. If the service fails, a pop up is raised indicating the error and a retry option is shown.
8. The development includes unit test.
9. The development includes integration tests.

Estimates

This will be the job of a frontend engineer, depending on the complexity of the design, this can take something between 2-4 days.


### Ticket 3 - Update generateReport service

Context: As we already have in our db which is going to be custom id for each agent, now we need to update the report function to consider this data while generating the reports for the facilities.

This task should update the `generateReport` service to include the validation of an existing id for each agent in the report, in that way, we send the information as requested. For performance purposes, we should create a `getCustomIdOfAgentInFacility` service to obtain the custom if of an agent in a certain Facility using the internal id of the agent and the facility. We also need an `addCustomsIdsInReport` service to transform all the internal ids into the customs ids inside a report, this last task will probbably be executed after the generation of the report, just as a second layer of execution.

A.C

1. getCustomIdOfAgentInFacility service is created and respond the custom id of an agent by passing the facility id and agent id.
2. addCustomsIdsInReport services is created and updates the report file by adding the custom-ids found by the previous service (if no custom ids are found, then it uses the internal ids as reference).
3. The development includes unit test.
4. The development includes integration tests.
5. When obtaining the reports of a facility the service automatically includes the custom ids of the agents.

Estimates

This will be a backend task, which has the dependency of the first backend task (Task 1). I see this a little more complext, probbaly this will take 5 days with the tests running and the documentation.


### Ticket 4 - Edit and delete custom id in the agents tab

This task can be an increment of the other one, to allow the user to edit and delete the existing custom id of the user. This might not be neccesary depending on the design definition of the previous task. In some cases, if a patch method is used, the add, delete and edit functionallity is already considered in one action.

Context: We need to have a new feature where the facility administrator can edit/delete the custom id

A.C

1. The facility admin can edit and delete the information of each agent.
3. The custom id can't have any special caracter.
7. If the service fails, a pop up is raised indicating the error and a retry option is shown.
8. The development includes unit test.
9. The development includes integration tests.

Estimates

This will be the job of a frontend engineer, depending on the complexity of the design, this should take 1-2 days.

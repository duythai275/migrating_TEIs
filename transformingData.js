const writejson = require("writejson");
const faker = require('@faker-js/faker/locale/en');

let page = 1;

while ( page < 73 ) {
    const TEIs = require(`./originalData/TEIs${page}.json`).trackedEntityInstances;
    
    writejson(`./updatedData/TEIs${page}.json`, {
        trackedEntityInstances: TEIs.map( tei => ({
            orgUnit: tei.orgUnit,
            trackedEntityInstance: tei.trackedEntityInstance,
            trackedEntityType: tei.trackedEntityType,
            inactive: tei.inactive,
            deleted: tei.deleted,
            featureType: tei.featureType,
            relationships: tei.relationships,
            attributes: tei.attributes
                .filter( ({attribute}) => attribute !== "aAMGnpxipjZ" && attribute !== "J3baKU6j8GG" && attribute !== "QX4ZiPma7bF" )
                .map( attributeValue => {
                    if ( attributeValue.attribute === "ZIDlK6BaAU2" ) return {
                        attribute: "ZIDlK6BaAU2",
                        value: faker.name.lastName()
                    }
                    if ( attributeValue.attribute === "gz8w04YBSS0" ) return {
                        attribute: "gz8w04YBSS0",
                        value: faker.name.firstName()
                    }
                    return attributeValue;
                })
        }))
    });
    
    writejson(`./updatedData/Enrollments${page}.json`, {
        enrollments: TEIs.map( tei => ({
            orgUnit: tei.enrollments[0].orgUnit,
            program: tei.enrollments[0].program,
            trackedEntityInstance: tei.enrollments[0].trackedEntityInstance,
            enrollment: tei.enrollments[0].enrollment,
            trackedEntityType: tei.enrollments[0].trackedEntityType,
            enrollmentDate: tei.enrollments[0].enrollmentDate,
            followup: tei.enrollments[0].followup,
            deleted: tei.enrollments[0].deleted,
            incidentDate: tei.enrollments[0].incidentDate,
            status: tei.enrollments[0].status,
            notes: tei.enrollments[0].notes,
            relationships: tei.enrollments[0].relationships,
            attributes: tei.enrollments[0].attributes
        }))
    });
    
    let events = [];
    TEIs.forEach( tei => {
        events = [
            ...events,
            ...tei.enrollments[0].events.map( event => ({
                dueDate: event.dueDate,
                program: event.program,
                event: event.event,
                programStage: event.programStage,
                orgUnit: event.orgUnit,
                trackedEntityInstance: event.trackedEntityInstance,
                enrollment: event.enrollment,
                enrollmentStatus: event.enrollmentStatus,
                status: event.status,
                eventDate: event.eventDate,
                attributeCategoryOptions: event.attributeCategoryOptions,
                followup: event.followup,
                deleted: event.deleted,
                attributeOptionCombo: event.attributeOptionCombo,
                dataValues: event.dataValues,
                notes: event.notes,
                relationships: event.relationships
            }))
        ]
    });
    writejson(`./updatedData/Events${page}.json`, { events: events });
    
    page++;
}
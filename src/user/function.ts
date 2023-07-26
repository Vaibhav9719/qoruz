import faker from 'faker';

export function getRandomIndianName() {
    const firstNames = [
        "Rahul", "Preeti", "Amit", "Sneha", "Suresh", "Smita", "Vikram", "Rashmi",
      ];
    
      const lastNames = [
        "Kumar", "Singh", "Sharma", "Patel", "Gupta", "Verma", "Bose", "Mukherjee",
      ];
    
      const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
      return `${randomFirstName} ${randomLastName}`;
}

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomIndianPhoneNumber() {
    const phoneNumber = faker.phone.phoneNumberFormat();
    return `+91 ${phoneNumber}`;
}

export function getRandomIndianPostalCode() {
    const postalCode = faker.address.zipCode('######'); // 6-digit Indian postal code format
    return postalCode;
}

function getRandomEmail() {
    const firstName = faker.name.firstName().toLowerCase();
    const lastName = faker.name.lastName().toLowerCase();
    const domain = faker.internet.domainName().toLowerCase();
    const email = `${firstName}.${lastName}@${domain}`;
    return email;
}
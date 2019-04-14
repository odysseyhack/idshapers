//import EthrDID from 'ethr-did'

let signClaim = function(claim) {
    //const keypair = EthrDID.createKeyPair();
    //const ethrDid = new EthrDID({...keypair});
    //console.log("DID: " + ethrDid.did)

    //const claimJWT = ethrDid.signJWT(claim)
    //console.log(claimJWT)

    //let decodedClaim = jwtLib.decodeJWT(await claimJWT)
    //console.log(decodedClaim)
    //console.log("Issuer: " + decodedClaim.payload.iss)

    //return claimJWT
    return "0x9jK3jdu3u1k3m14njdqq112312126"
}

let approveProperty = function(property, passengerDid) {
    property["did"] = passengerDid
    property["issuedDate"] = [Date.now()]

    let signature =  signClaim(property)
    //console.log(signature)
    property["signature"] = [signature]
}

export var SubmitPersonalDataToKLMService = function(passengerDid, passengerGeneratedClaims) {
    let klmVerifiedClaims = [];
    for (let i in passengerGeneratedClaims) {
        // make structure copy
        let letsApprove = JSON.parse(JSON.stringify(passengerGeneratedClaims[i]))
        klmVerifiedClaims.push(letsApprove)
        approveProperty(letsApprove, passengerDid)
    }

    let klmGeneratedClaims = [
        FirstNameClaim,
        LastNameClaim,
        BirthDateClaim,
        IsOver18Claim,
        PersonalIdClaim,
        DocumentIdClaim,
        DocumentCertifiedClaim,
        IsBoardingpassValidClaim,
        IsTaxFreeRegionClaim,
        HasMembershipClaim
    ]
    for (let j in klmGeneratedClaims) {
        let letsApprove = klmGeneratedClaims[j]
        klmVerifiedClaims.push(letsApprove)
        approveProperty(letsApprove, passengerDid)
    }

    return klmVerifiedClaims
}

export var FirstNameClaim = {
    type: "firstName",
    value: "John"
}

export var LastNameClaim = {
    type: "lastName",
    value: "Doe",
}
export var BirthDateClaim = {
    type: "birthDate",
    value: "2000-01-01",
}

export var IsOver18Claim = {
    type: "isOver18",
    value: true,
}

export var PersonalIdClaim = {
    type: "personalId",
    value: "3001112323233434",
}

export var DocumentIdClaim = {
    type: "documentId",
    value: "602243343454",
}

export var SelfiePhotoClaim = {
    type: "selfiePhoto",
    value: "BASE64:f52f2f29ff8ff",
}

export var FacePrintClaim = {
    type: "facePrint",
    value: "1110000011111000111111101111011011110010111011001111110011110100",
}

export var DocumentPhotoClaim = {
    type: "documentPhoto",
    value: "BASE64:ff8f8fff4f5ff",
}

export var DocumentCertifiedClaim = {
    type: "documentCertified",
    value: true,
}

export var IsBoardingpassValidClaim = {
    type: "isBoardingpassValid",
    value: true,
}

export var IsTaxFreeRegionClaim = {
    type: "isTaxFreeRegion",
    value: true,
}

export var HasMembershipClaim = {
    type: "membershipProof",
    value: true,
}
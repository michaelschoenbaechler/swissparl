export enum Collection {
  MemberParty = "MemberParty",
  Party = "Party",
  Person = "Person",
  PersonAddress = "PersonAddress",
  PersonCommunication = "PersonCommunication",
  PersonInterest = "PersonInterest",
  Session = "Session",
  Committee = "Committee",
  MemberCommittee = "MemberCommittee",
  Canton = "Canton",
  Council = "Council",
  Objective = "Objective",
  Resolution = "Resolution",
  Publication = "Publication",
  External = "External",
  Meeting = "Meeting",
  Subject = "Subject",
  Citizenship = "Citizenship",
  Preconsultation = "Preconsultation",
  Bill = "Bill",
  BillLink = "BillLink",
  BillStatus = "BillStatus",
  Business = "Business",
  BusinessResponsibility = "BusinessResponsibility",
  BusinessRole = "BusinessRole",
  LegislativePeriod = "LegislativePeriod",
  MemberCouncil = "MemberCouncil",
  MemberParlGroup = "MemberParlGroup",
  ParlGroup = "ParlGroup",
  PersonOccupation = "PersonOccupation",
  RelatedBusiness = "RelatedBusiness",
  BusinessStatus = "BusinessStatus",
  BusinessType = "BusinessType",
  MemberCouncilHistory = "MemberCouncilHistory",
  MemberCommitteeHistory = "MemberCommitteeHistory",
  Vote = "Vote",
  Voting = "Voting",
  SubjectBusiness = "SubjectBusiness",
  Transcript = "Transcript",
  ParlGroupHistory = "ParlGroupHistory",
  Tags = "Tags",
  SeatOrganisationNr = "SeatOrganisationNr",
  PersonEmployee = "PersonEmployee",
  Rapporteur = "Rapporteur",
}

export interface SwissParlEntity {}

export interface MemberParty extends SwissParlEntity {
  ID?: number;
  Language?: string;
  PartyNumber?: number;
  PartyName?: string;
  PersonNumber?: number;
  PersonIdCode?: number;
  FirstName?: string;
  LastName?: string;
  GenderAsString?: string;
  PartyFunction?: string;
  Modified?: string;
  PartyAbbreviation?: string;
}

export interface Party extends SwissParlEntity {
  ID?: number;
  Language?: string;
  PartyNumber?: number;
  PartyName?: string;
  StartDate?: string;
  EndDate?: string;
  Modified?: string;
  PartyAbbreviation?: string;
}

export interface Person extends SwissParlEntity {
  ID?: number;
  Language?: string;
  PersonNumber?: number;
  PersonIdCode?: number;
  Title?: number;
  TitleText?: string;
  LastName?: string;
  GenderAsString?: string;
  DateOfBirth?: string;
  DateOfDeath?: string;
  MaritalStatus?: number;
  MaritalStatusText?: string;
  PlaceOfBirthCity?: string;
  PlaceOfBirthCanton?: string;
  Modified?: string;
  FirstName?: string;
  OfficialName?: string;
  MilitaryRank?: number;
  MilitaryRankText?: string;
  NativeLanguage?: string;
  NumberOfChildren?: number;
}

export interface PersonAddress extends SwissParlEntity {
  ID?: string;
  Language?: string;
  Modified?: string;
  PersonNumber?: number;
  AddressType?: number;
  AddressTypeName?: string;
  IsPublic?: boolean;
  AddressLine1?: string;
  AddressLine2?: string;
  AddressLine3?: string;
  City?: string;
  CantonName?: string;
  Comments?: string;
  CantonNumber?: number;
  Postcode?: string;
  CantonAbbreviation?: string;
}

export interface PersonCommunication extends SwissParlEntity {
  ID?: string;
  Language?: string;
  PersonNumber?: number;
  Address?: string;
  CommunicationType?: number;
  CommunicationTypeText?: string;
  Modified?: string;
}

export interface PersonInterest extends SwissParlEntity {
  ID?: string;
  Language?: string;
  OrganizationType?: number;
  OrganizationTypeText?: string;
  OrganizationTypeShortText?: string;
  FunctionInAgency?: number;
  FunctionInAgencyText?: string;
  FunctionInAgencyShortText?: string;
  Agency?: string;
  PersonNumber?: number;
  Modified?: string;
  InterestType?: number;
  InterestTypeText?: string;
  InterestTypeShortText?: string;
  FirstName?: string;
  LastName?: string;
  InterestName?: string;
  SortOrder?: number;
  Paid?: boolean;
}

export interface Session extends SwissParlEntity {
  ID?: number;
  Language?: string;
  SessionNumber?: number;
  SessionName?: string;
  Abbreviation?: string;
  StartDate?: string;
  EndDate?: string;
  Title?: string;
  Type?: number;
  TypeName?: string;
  Modified?: string;
  LegislativePeriodNumber?: number;
}

export interface Committee extends SwissParlEntity {
  ID?: number;
  Language?: string;
  CommitteeNumber?: number;
  MainCommitteeNumber?: number;
  SubCommitteeNumber?: number;
  CommitteeName?: string;
  Abbreviation?: string;
  Abbreviation1?: string;
  Abbreviation2?: string;
  Council?: number;
  CouncilName?: string;
  Modified?: string;
  CommitteeType?: number;
  CommitteeTypeName?: string;
  CommitteeTypeAbbreviation?: string;
  CouncilAbbreviation?: string;
  DisplayType?: number;
}

export interface MemberCommittee extends SwissParlEntity {
  ID?: string;
  Language?: string;
  CommitteeNumber?: number;
  PersonNumber?: number;
  PersonIdCode?: number;
  CommitteeFunction?: number;
  CommitteeFunctionName?: string;
  FirstName?: string;
  LastName?: string;
  GenderAsString?: string;
  PartyNumber?: number;
  PartyName?: string;
  Council?: number;
  CouncilName?: string;
  Canton?: number;
  CantonName?: string;
  Modified?: string;
  ParlGroupNumber?: number;
  ParlGroupName?: string;
  ParlGroupAbbreviation?: string;
  ParlGroupCode?: string;
  PartyAbbreviation?: string;
  CouncilAbbreviation?: string;
  CantonAbbreviation?: string;
  CommitteeName?: string;
  Abbreviation?: string;
  Abbreviation1?: string;
  Abbreviation2?: string;
  CommitteeType?: number;
  CommitteeTypeName?: string;
  CommitteeTypeAbbreviation?: string;
}

export interface Canton extends SwissParlEntity {
  ID?: number;
  Language?: string;
  CantonNumber?: number;
  CantonName?: string;
  CantonAbbreviation?: string;
}

export interface Council extends SwissParlEntity {
  ID?: number;
  Language?: string;
  CouncilName?: string;
  CouncilAbbreviation?: string;
  Modified?: string;
}

export interface Objective extends SwissParlEntity {
  ID?: string;
  Language?: string;
  PublicationDate?: string;
  ReferenceType?: number;
  ReferenceTypeName?: string;
  ReferenceText?: string;
  PublicationType?: number;
  PublicationTypeName?: string;
  PublicationText?: string;
  PublicationVolume?: string;
  PublicationYear?: string;
  PublicationNumber?: string;
  IsOldPublicationFormat?: boolean;
  Modified?: string;
  IdBusiness?: string;
  IdBill?: string;
  BusinessNumber?: number;
  BusinessShortNumber?: string;
  BillNumber?: number;
  BusinessType?: number;
  BusinessTypeName?: string;
  BusinessTypeAbbreviation?: string;
  PublicationTypeAbbreviation?: string;
  ReferendumDeadline?: string;
}

export interface Resolution extends SwissParlEntity {
  ID?: string;
  Language?: string;
  ResolutionNumber?: number;
  ResolutionDate?: string;
  ResolutionId?: number;
  ResolutionText?: string;
  Council?: number;
  CouncilName?: string;
  Category?: number;
  CategoryName?: string;
  CommitteeType?: number;
  CommitteeName?: string;
  Modified?: string;
  IdBill?: string;
  CouncilAbbreviation?: string;
  CommitteeAbbreviation?: string;
  CommitteeAbbreviation1?: string;
  CommitteeAbbreviation2?: string;
  Committee?: number;
}

export interface Publication extends SwissParlEntity {
  ID?: string;
  Language?: string;
  PublicationType?: number;
  PublicationTypeName?: string;
  SortOrder?: number;
  IsOldFormat?: boolean;
  Title?: string;
  Page?: string;
  Volume?: string;
  Year?: string;
  Modified?: string;
  BusinessNumber?: number;
  BusinessShortNumber?: string;
  PublicationTypeAbbreviation?: string;
}

export interface External extends SwissParlEntity {
  ID?: string;
  Language?: string;
  Name?: string;
  Modified?: string;
}

export interface Meeting extends SwissParlEntity {
  ID?: number;
  Language?: string;
  MeetingNumber?: number;
  IdSession?: number;
  SessionNumber?: number;
  SessionName?: string;
  Council?: number;
  CouncilName?: string;
  CouncilAbbreviation?: string;
  Date?: string;
  Begin?: string;
  Modified?: string;
  LegislativePeriodNumber?: number;
  PublicationStatus?: string;
  MeetingOrderText?: string;
  SortOrder?: number;
  Location?: string;
}

export interface Subject extends SwissParlEntity {
  ID?: number;
  Language?: string;
  IdMeeting?: number;
  VerbalixOid?: number;
  SortOrder?: number;
  Modified?: string;
}

export interface Citizenship extends SwissParlEntity {
  ID?: string;
  Language?: string;
  PersonNumber?: number;
  PostCode?: string;
  City?: string;
  CantonName?: string;
  CantonAbbreviation?: string;
  Modified?: string;
}

export interface Preconsultation extends SwissParlEntity {
  ID?: string;
  Language?: string;
  IdBill?: string;
  BillNumber?: number;
  BusinessNumber?: number;
  BusinessShortNumber?: string;
  BusinessTitle?: string;
  CommitteeNumber?: number;
  CommitteeName?: string;
  CommitteeDisplayType?: number;
  Abbreviation?: string;
  Abbreviation1?: string;
  Abbreviation2?: string;
  PreconsultationDate?: string;
  TreatmentCategory?: string;
  Modified?: string;
  BusinessType?: number;
  BusinessTypeName?: string;
  BusinessTypeAbbreviation?: string;
}

export interface Bill extends SwissParlEntity {
  ID?: string;
  Language?: string;
  IdBusiness?: string;
  BusinessNumber?: number;
  BusinessShortNumber?: string;
  BusinessType?: number;
  BusinessTypeName?: string;
  BusinessTypeAbbreviation?: string;
  Title?: string;
  BillNumber?: number;
  BillType?: number;
  BillTypeName?: string;
  BusinessStatus?: number;
  BusinessStatusText?: string;
  BusinessStatusDate?: string;
  Modified?: string;
  SubmissionDate?: string;
}

export interface BillLink extends SwissParlEntity {
  ID?: string;
  IdBill?: string;
  LinkText?: string;
  LinkUrl?: string;
  Language?: string;
  Modified?: string;
  LinkTypeId?: number;
  LinkType?: string;
  StartDate?: string;
}

export interface BillStatus extends SwissParlEntity {
  ID?: string;
  IdBill?: string;
  Status?: number;
  StatusText?: string;
  Council?: number;
  CouncilName?: string;
  CouncilAbbreviation?: string;
  Category?: number;
  CategoryName?: string;
  CommitteeType?: number;
  CommitteeName?: string;
  CommitteeAbbreviation?: string;
  CommitteeAbbreviation1?: string;
  CommitteeAbbreviation2?: string;
  Language?: string;
  Modified?: string;
}

export interface Business extends SwissParlEntity {
  ID?: number;
  Language?: string;
  BusinessShortNumber?: string;
  BusinessType?: number;
  BusinessTypeName?: string;
  BusinessTypeAbbreviation?: string;
  Title?: string;
  Description?: string;
  InitialSituation?: string;
  Proceedings?: string;
  DraftText?: string;
  SubmittedText?: string;
  ReasonText?: string;
  DocumentationText?: string;
  MotionText?: string;
  FederalCouncilResponseText?: string;
  FederalCouncilProposal?: number;
  FederalCouncilProposalText?: string;
  FederalCouncilProposalDate?: string;
  SubmittedBy?: string;
  BusinessStatus?: number;
  BusinessStatusText?: string;
  BusinessStatusDate?: string;
  ResponsibleDepartment?: number;
  ResponsibleDepartmentName?: string;
  ResponsibleDepartmentAbbreviation?: string;
  IsLeadingDepartment?: boolean;
  Tags?: string;
  Category?: string;
  Modified?: string;
  SubmissionDate?: string;
  SubmissionCouncil?: number;
  SubmissionCouncilName?: string;
  SubmissionCouncilAbbreviation?: string;
  SubmissionSession?: number;
  SubmissionLegislativePeriod?: number;
  FirstCouncil1?: number;
  FirstCouncil1Name?: string;
  FirstCouncil1Abbreviation?: string;
  FirstCouncil2?: number;
  FirstCouncil2Name?: string;
  FirstCouncil2Abbreviation?: string;
  TagNames?: string;
}

export interface BusinessResponsibility extends SwissParlEntity {
  ID?: string;
  Language?: string;
  BusinessNumber?: number;
  DepartmentNumber?: number;
  DepartmentName?: string;
  DepartmentAbbreviation?: string;
  IsLeading?: boolean;
  Modified?: string;
  BillNumber?: number;
}

export interface BusinessRole extends SwissParlEntity {
  ID?: string;
  Language?: string;
  Role?: number;
  RoleName?: string;
  BusinessNumber?: number;
  IdExternal?: string;
  ParlGroupNumber?: number;
  CantonNumber?: number;
  CommitteeNumber?: number;
  MemberCouncilNumber?: number;
  ReturnType?: number;
  Modified?: string;
  BusinessShortNumber?: string;
  BusinessTitle?: string;
  BusinessSubmissionDate?: string;
  BusinessType?: number;
  BusinessTypeName?: string;
  BusinessTypeAbbreviation?: string;
}

export interface LegislativePeriod extends SwissParlEntity {
  ID?: number;
  Language?: string;
  LegislativePeriodNumber?: number;
  LegislativePeriodName?: string;
  LegislativePeriodAbbreviation?: string;
  StartDate?: string;
  EndDate?: string;
  Modified?: string;
}

export interface MemberCouncil extends SwissParlEntity {
  ID?: number;
  Language?: string;
  IdPredecessor?: string;
  PersonNumber?: number;
  PersonIdCode?: number;
  Active?: boolean;
  FirstName?: string;
  LastName?: string;
  GenderAsString?: string;
  Canton?: number;
  CantonName?: string;
  CantonAbbreviation?: string;
  Council?: number;
  CouncilName?: string;
  CouncilAbbreviation?: string;
  ParlGroupNumber?: number;
  ParlGroupName?: string;
  ParlGroupAbbreviation?: string;
  ParlGroupFunction?: number;
  ParlGroupFunctionText?: string;
  Party?: number;
  PartyName?: string;
  PartyAbbreviation?: string;
  MilitaryRank?: number;
  MilitaryRankText?: string;
  MaritalStatus?: number;
  MaritalStatusText?: string;
  Nationality?: string;
  BirthPlace_City?: string;
  BirthPlace_Canton?: string;
  Mandates?: string;
  AdditionalMandate?: string;
  AdditionalActivity?: string;
  OfficialName?: string;
  DateJoining?: string;
  DateLeaving?: string;
  DateElection?: string;
  DateOath?: string;
  DateResignation?: string;
  Modified?: string;
  NumberOfChildren?: number;
  Citizenship?: string;
  DateOfBirth?: string;
  DateOfDeath?: string;
}

export interface MemberParlGroup extends SwissParlEntity {
  ID?: number;
  Language?: string;
  PersonNumber?: number;
  PersonIdCode?: number;
  FirstName?: string;
  LastName?: string;
  OfficialName?: string;
  GenderAsString?: string;
  PartyNumber?: number;
  PartyName?: string;
  PartyAbbreviation?: string;
  CantonNumber?: number;
  CantonName?: string;
  CantonAbbreviation?: string;
  ParlGroupNumber?: number;
  ParlGroupName?: string;
  ParlGroupAbbreviation?: string;
  ParlGroupFunction?: number;
  ParlGroupFunctionName?: string;
  CouncilNumber?: number;
  CouncilName?: string;
  CouncilAbbreviation?: string;
  Modified?: string;
}

export interface ParlGroup extends SwissParlEntity {
  ID?: number;
  Language?: string;
  ParlGroupNumber?: number;
  IsActive?: boolean;
  ParlGroupCode?: string;
  ParlGroupName?: string;
  ParlGroupAbbreviation?: string;
  NameUsedSince?: string;
  Modified?: string;
  ParlGroupColour?: string;
}

export interface PersonOccupation extends SwissParlEntity {
  ID?: string;
  Language?: string;
  PersonNumber?: number;
  Occupation?: number;
  OccupationName?: string;
  StartDate?: string;
  EndDate?: string;
  Modified?: string;
  Employer?: string;
  JobTitle?: string;
}

export interface RelatedBusiness extends SwissParlEntity {
  ID?: string;
  Language?: string;
  BusinessNumber?: number;
  BusinessTitle?: string;
  BusinessShortNumber?: string;
  RelatedBusinessNumber?: number;
  RelatedBusinessShortNumber?: string;
  RelatedBusinessTitle?: string;
  PriorityCode?: string;
  Modified?: string;
  RelatedBusinessType?: number;
  RelatedBusinessTypeName?: string;
  RelatedBusinessTypeAbbreviation?: string;
}

export interface BusinessStatus extends SwissParlEntity {
  ID?: string;
  Language?: string;
  BusinessNumber?: number;
  BusinessStatusId?: number;
  BusinessStatusName?: string;
  BusinessStatusDate?: string;
  IsMotionInSecondCouncil?: boolean;
  NewKey?: number;
  Modified?: string;
}

export interface BusinessType extends SwissParlEntity {
  ID?: number;
  BusinessTypeName?: string;
  BusinessTypeAbbreviation?: string;
  Language?: string;
  Modified?: string;
}

export interface MemberCouncilHistory extends SwissParlEntity {
  ID?: string;
  Language?: string;
  IdPredecessor?: string;
  PersonNumber?: number;
  PersonIdCode?: number;
  Active?: boolean;
  FirstName?: string;
  LastName?: string;
  GenderAsString?: string;
  Canton?: number;
  CantonName?: string;
  CantonAbbreviation?: string;
  Council?: number;
  CouncilName?: string;
  CouncilAbbreviation?: string;
  ParlGroupNumber?: number;
  ParlGroupName?: string;
  ParlGroupAbbreviation?: string;
  ParlGroupFunction?: number;
  ParlGroupFunctionText?: string;
  Party?: number;
  PartyName?: string;
  PartyAbbreviation?: string;
  MilitaryRank?: number;
  MilitaryRankText?: string;
  MaritalStatus?: number;
  MaritalStatusText?: string;
  BirthPlace_City?: string;
  BirthPlace_Canton?: string;
  Mandates?: string;
  AdditionalMandate?: string;
  AdditionalActivity?: string;
  OfficialName?: string;
  DateJoining?: string;
  DateLeaving?: string;
  DateElection?: string;
  DateOath?: string;
  DateResignation?: string;
  Modified?: string;
  Citizenship?: string;
  DateOfBirth?: string;
  DateOfDeath?: string;
}

export interface MemberCommitteeHistory extends SwissParlEntity {
  ID?: string;
  Language?: string;
  PersonNumber?: number;
  PersonIdCode?: number;
  FirstName?: string;
  LastName?: string;
  GenderAsString?: string;
  CommitteeNumber?: number;
  CommitteeName?: string;
  Abbreviation?: string;
  Abbreviation1?: string;
  Abbreviation2?: string;
  CommitteeFunction?: number;
  CommitteeFunctionName?: string;
  DateJoining?: string;
  DateLeaving?: string;
  ParlGroupNumber?: number;
  ParlGroupName?: string;
  ParlGroupAbbreviation?: string;
  ParlGroupCode?: string;
  PartyNumber?: number;
  PartyName?: string;
  PartyAbbreviation?: string;
  Council?: number;
  CouncilName?: string;
  CouncilAbbreviation?: string;
  Canton?: number;
  CantonName?: string;
  CantonAbbreviation?: string;
  Modified?: string;
}

export interface Vote extends SwissParlEntity {
  ID?: number;
  Language?: string;
  RegistrationNumber?: number;
  BusinessNumber?: number;
  BusinessShortNumber?: string;
  BusinessTitle?: string;
  BusinessAuthor?: string;
  BillNumber?: number;
  BillTitle?: string;
  IdLegislativePeriod?: number;
  IdSession?: number;
  SessionName?: string;
  Subject?: string;
  MeaningYes?: string;
  MeaningNo?: string;
  VoteEnd?: string;
  VoteEndWithTimezone?: any;
}

export interface Voting extends SwissParlEntity {
  ID?: number;
  Language?: string;
  IdVote?: number;
  RegistrationNumber?: number;
  PersonNumber?: number;
  FirstName?: string;
  LastName?: string;
  Canton?: string;
  CantonName?: string;
  ParlGroupCode?: string;
  ParlGroupColour?: string;
  ParlGroupName?: string;
  ParlGroupNameAbbreviation?: string;
  Decision?: number;
  DecisionText?: string;
  BusinessNumber?: number;
  BusinessShortNumber?: string;
  BusinessTitle?: string;
  BillTitle?: string;
  IdLegislativePeriod?: number;
  IdSession?: number;
  VoteEnd?: string;
  MeaningYes?: string;
  MeaningNo?: string;
  CantonID?: number;
  Subject?: string;
  VoteEndWithTimezone?: any;
}

export interface SubjectBusiness extends SwissParlEntity {
  IdSubject?: number;
  BusinessNumber?: number;
  Language?: string;
  BusinessShortNumber?: string;
  Title?: string;
  SortOrder?: number;
  PublishedNotes?: string;
  Modified?: string;
  TitleDE?: string;
  TitleFR?: string;
  TitleIT?: string;
}

export interface Transcript extends SwissParlEntity {
  ID?: number;
  Language?: string;
  IdSubject?: number;
  VoteId?: string;
  PersonNumber?: number;
  Type?: number;
  Text?: string;
  MeetingCouncilAbbreviation?: string;
  MeetingDate?: string;
  MeetingVerbalixOid?: number;
  IdSession?: string;
  SpeakerFirstName?: string;
  SpeakerLastName?: string;
  SpeakerFullName?: string;
  SpeakerFunction?: string;
  CouncilId?: number;
  CouncilName?: string;
  CantonId?: number;
  CantonName?: string;
  CantonAbbreviation?: string;
  ParlGroupName?: string;
  ParlGroupAbbreviation?: string;
  SortOrder?: number;
  Start?: string;
  End?: string;
  Function?: string;
  DisplaySpeaker?: boolean;
  LanguageOfText?: string;
  Modified?: string;
  StartTimeWithTimezone?: any;
  EndTimeWithTimezone?: any;
  VoteBusinessNumber?: number;
  VoteBusinessShortNumber?: string;
  VoteBusinessTitle?: string;
}

export interface ParlGroupHistory extends SwissParlEntity {
  ID?: string;
  Language?: string;
  ParlGroupNumber?: number;
  ParlGroupColour?: string;
  IsActive?: number;
  ParlGroupName?: string;
  ParlGroupAbbreviation?: string;
  NameUsedSince?: string;
  Modified?: string;
}

export interface Tags extends SwissParlEntity {
  ID?: number;
  Language?: string;
  TagName?: string;
}

export interface SeatOrganisationNr extends SwissParlEntity {
  ID?: number;
  SeatNumber?: number;
  PersonNumber?: number;
  PersonIdCode?: number;
  FirstName?: string;
  LastName?: string;
  CantonAbbreviation?: string;
  ParlGroupNumber?: number;
  ParlGroupName?: string;
  Language?: string;
}

export interface PersonEmployee extends SwissParlEntity {
  ID?: string;
  Language?: string;
  PersonNumber?: number;
  LastName?: string;
  FirstName?: string;
  Employer?: string;
  JobTitle?: string;
  Modified?: string;
}

export interface Rapporteur extends SwissParlEntity {
  ID?: string;
  BusinessNumber?: number;
  BusinessShortNumber?: string;
  BusinessTitle?: string;
  IdBill?: string;
  CommitteeNumber?: number;
  MemberCouncilNumber?: number;
  LastName?: string;
  FirstName?: string;
  Language?: string;
  Modified?: string;
}

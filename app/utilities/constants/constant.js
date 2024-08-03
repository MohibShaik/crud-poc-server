const ORACLE_FUSION_CONSTANTS = {
  HOST_URL: 'https://edvp-dev7.fa.em2.oraclecloud.com',
  ABSENCES_URL:
    'https://edvp-dev7.fa.em2.oraclecloud.com/hcmRestApi/resources/11.13.18.05/absences',
  IVY_ABSENCES_URL:
    "https://edvp-dev7.fa.em2.oraclecloud.com/hcmRestApi/resources/11.13.18.05/absences?q=createdBy LIKE '%@ivycomptech.com';",
};

const AZURE_CONSTANTS = {
  HOST_URL: 'https://graph.microsoft.com/v1.0/users',
  // GET_MANAGER_INFO: 'https://graph.microsoft.com/v1.0/users/',
  GENERATE_TOKEN:
    'https://login.microsoftonline.com/60c43c0a-64ac-4050-bf3e-31e1cdfffdeb/oauth2/v2.0/token',
  SEARCH_ACCESS_TOKEN:
    'eyJ0eXAiOiJKV1QiLCJub25jZSI6ImZ3cGhLSk5fZ3JwVi1LX21nUE92WjRhRHR4TjJoemVOaENwVGlRMFdDWm8iLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82MGM0M2MwYS02NGFjLTQwNTAtYmYzZS0zMWUxY2RmZmZkZWIvIiwiaWF0IjoxNjgzMDk2ODYzLCJuYmYiOjE2ODMwOTY4NjMsImV4cCI6MTY4MzEwMDc2MywiYWlvIjoiRTJaZ1lHZ084ZzhSTURJNTl2Snd0a0g4Y3ZldEFBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJJdnliaXRlcyIsImFwcGlkIjoiM2Y4M2UwYzEtNDg0MS00MDQwLWE1YmQtNGMxYTRhNTM4ZDVkIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjBjNDNjMGEtNjRhYy00MDUwLWJmM2UtMzFlMWNkZmZmZGViLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiOGZmZjkwNDctMDhjNS00ZDcyLTg0NDktZjFhNWRmZDExZDVhIiwicmgiOiIwLkFRa0FDanpFWUt4a1VFQ19QakhoemZfOTZ3TUFBQUFBQUFBQXdBQUFBQUFBQUFBSkFBQS4iLCJyb2xlcyI6WyJVc2VyLlJlYWQuQWxsIl0sInN1YiI6IjhmZmY5MDQ3LTA4YzUtNGQ3Mi04NDQ5LWYxYTVkZmQxMWQ1YSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJFVSIsInRpZCI6IjYwYzQzYzBhLTY0YWMtNDA1MC1iZjNlLTMxZTFjZGZmZmRlYiIsInV0aSI6IkppbDdZNGphNEVLaU5EVUlpREU5QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjA5OTdhMWQwLTBkMWQtNGFjYi1iNDA4LWQ1Y2E3MzEyMWU5MCJdLCJ4bXNfdGNkdCI6MTM4NzI5NDczMH0.PRDJWJL8WBS5_jff1p4cfdmQqw4XcPSCu5ndJYIcYq2skw_A9xPCJX6cgXQb6AdtomhxpZlLKn5790xdIrbboAz3zSUtcxnkPcAyob2RQ5qiVef4U6Hw2cojPip4pDMCYPEj-egb7mdv2TIEfX-JC6qsC2bAGh4SL6Xb36woyb8arzAHyVsFFdrZCEAhB9ie86Rhj_9Cdt8Canqg5mKvauaYcV3kWQPOKcVZKe-OtWD1oQirF3ZCxO_S2fY-i3VdzdGMAVtBMbCYX1RZ_6zwoPxlEiiLoLzom899eTGUOh03rXgpmKY0ew6Y7AiBBfITP0j-IiISgmS_w37TIkBXUA',
};
const REQUEST_METHODS = {
  POST: 'post',
  GET: 'get',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
};


const TIME_CONFIG = {
  weekdayBeginningTime: '8:15pm',
  weekdayEndingTime: '10:15pm',
  weekendBeginningTime: '12:00pm',
  weekendEndingTime: '10:15pm',
};
const CUSTOM_FIELDS = {};

module.exports = {
  REQUEST_METHODS,
  CUSTOM_FIELDS,
  AZURE_CONSTANTS,
  TIME_CONFIG
};

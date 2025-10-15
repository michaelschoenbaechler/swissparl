# Changelog

All notable changes to the swissparl project will be documented in this file.

## [0.6.2] - 2024-06-24

- Update dependencies

## [0.6.1] - 2023-09-05

- Fixed a bug where the `substringOf` function would not work as expected when used in conjunction with other operators. `substringOf` should not result in logical OR with other operators.

## [0.6.0] - 2023-09-04

- SubstringOf now supports multiple search terms, allowing users to search for multiple substrings within specified properties.
- Renaming of the exposed function queryCollection to fetchCollection.

## [0.5.0] - 2023-04-02

- Introduced the substringOf function to enable users to filter data by searching for substrings within specified properties.

## [0.4.0] - 2023-02-24

- Added support for filter operators (eq, ne, gt, lt, ge, le, and substringOf), enhancing the flexibility of filtering options when querying data.

## [0.3.0] - 2022-11-09

- Introduced optional configuration settings for deep parsing expanded objects, allowing for more control over the parsing process.
- Added the ability to change the maximum number of result entries returned by queries, providing users with greater flexibility in managing their data.

## [0.2.0] - 2022-11-06

- Implemented orderby options, enabling users to sort query results by specific properties in ascending or descending order.

## [0.1.0] - 2022-11-02

- Added support for top, skip, and select operators, allowing users to limit the number of returned results, paginate through result sets, and choose specific properties to be included in the response data.

## [0.0.1] - 2022-10-08

- Initial release of the swissparl library.

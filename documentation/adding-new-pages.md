# Adding new webpages to the project

* Add the page component to a new file in the `src/Pages/` directory. Make sure the component to be displayed in the browser is the default export.
* Add an entry to `src/Enums/PageIdentifiers.js`. The name of the key should be identical to the name of the file (minus the `.tsx` extension) created in `src/Pages/`. The value should be identical to the key.
* Add the same entry (with slightly different formatting) to `src/Enums/PageIdentiifers.d.ts`.
* Add an entry to `src/Enums/RouteIdentifiers.ts`. The key for this should be identical to the key and value added to `src/Enums/PageIdentifiers.(js|d.ts)`.
* Add the title of the page to `src/Enums/PageTitles`. This value will be shown in the user's browser, so make it short and professional.
* Add an entry to the return types for the `server/getMetaDescription.ts` function. The description should be less than 155 characters, and will appear in search engine results.
* (Optional) Add a file containing a new link action to `src/Actions/Link/`. This link action should implement `ILinkAction` and meet the `isLinkAction` type guard.
* (Optional) Add a link to the new page in the site map, located at `src/Components/SiteMap.tsx`.
* Add tests for any of the above as necessary.
* Follow steps #3 onward in `documentation/making-changes.md`.

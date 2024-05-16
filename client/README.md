# Unique Things Frontend Side

## Quickstart

```sh
docker-compose up
```

## Aliases

It just makes it a lot easier to import from anywhere within the project and move files around without changing imports, and you never end up with something like ../../../../../components/

```sh
"@/components/*": ["components/*"],
"@/ui/*": ["components/ui/*"],
"@/screens/*": ["components/screens/*"],
"@/hooks/*": ["hooks/*"],
"@/shared/*": ["shared/*"],
"@/configs/*": ["configs/*"],
"@/services/*": ["services/*"],
"@/utils/*": ["utils/*"],
"@/store/*": ["store/*"],
"@/assets/*": ["assets/*"]
```

## Structure

The top level directory structure will be as follows:

```
* assets — global static assets such as images, svgs, company logo, etc.
* components — global shared/reusable components, such as layout (wrappers, navigation), form components, buttons
* configs — any global configs
* hooks — global hooks such as useActions, useOutside and other
* providers — functional wrapper, ex. AuthProvider or HeadProvider
* services — modules to work with server or localStorage
* shared — global shared/reusable regex, types or interfaces, but it's not component
* store — global Redux store
* utils — utilities, helpers, converters, constants, and the like
```

## Detailed Structure

```sh
└── src/
    ├── app/                    # Layer: Application
    |
    ├── assets/                 # Layer: Assets (optional)
    |   ├── images/             # Images and logo
    |   └── styles/             # Global styles
    |   ...
    |
    ├── components/             # Layer: Components
    |   ├── layout/             # Project wrapper
    |   ├── screens/            # Pages logic
    |   └── ui/                 # UI logic
    |   ...
    |
    ├── configs/                # Layer: Configs (optional)
    |   ...
    |
    ├── hooks/                  # Layer: Hooks
    |   ...
    |
    ├── providers/              # Layer: Providers (optional)
    |   ...
    |
    ├── services/               # Layer: Services
    |   ...
    |
    ├── shared/                 # Layer: Shared
    |   ├── interfaces/         # Global interfaces
    |   └── types/              # Global types
    |   ...
    |
    ├── store/                  # Layer: Store
    |   ├── authentication/
    |       ├── /slice
    │   │   ├── /actions
    │   │   └── /test
    |   ├── authors/
    │   ├── rootReducer.ts
    |   └── index.ts
    |   ...
    |
    ├── utils/                  # Layer: Utils
    |   ├── constants/
    |   └── helpers/
    |   ...
    |
└── pages/                      # Layer: Pages
    ├── _app.tsx
    └── index.tsx
    ...

└── public/                     # Layer: Public
```

## UI Components

### Button

```sh
<Button title="Creare Item" appearance="large" className="btn-primary" arrow />
```

- `appearance`: to change button size. You can use: `large` or `small`
- `className`: to change tailwind css property for button. You can use: `btn-primary` or `btn-ghost`
- `arrow`: render the visibility of the arrow. You can use: `arrow={true}` | `arrow={false}` or `arrow` or do not use

### Dropdown

```sh
<Dropdown appearance="extended" item={item} />
```

- `item`: displays dropdown items. Their format:

```sh
{
  icon: "MdCreate",
  link: "/",
  title: "Create",
}
```

- `appearance`: to change size of the displayed data. You can use: `extended` or `simple`

### Field

```sh
<Field placeholder="Password" error={errors.password} type="password" />
```

- `placeholder`: enter placeholder text
- `error`: render input error messages. Use React Hook Form for this
- `type`: to change input type. Default: `text`

### Icon

```sh
<MaterialIcon name={icon} />
```

- `name`: to change Material Design icon. It's simple, typing is connected here

### Toastr message

```sh
<ReduxToastr />
```

### Select

```sh

```

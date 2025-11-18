# Repositori Front-End PELITA
PELITA: Pendamping Teliti Anak TK

Platform pengawasan kegiatan anak TK dan jembatan komunikasi antara orang tua dengan sekolah berbasis web.

# Kelompok 15 (PELITA)
1. Argya Sabih Elysio - 23/512630/TK/56335
2. Christian Kevin Andhika Dandaiva - 23/513576/TK/56433
3. Lisa Olivia Putri Maharani - 23/519241/TK/57250
4. Pradana Yahya Abdillah - 23/515259/TK/56625
5. Muhammad Hafidz Al Farisi - 23/519650/TK/57256

## Design 

[Figma Link](https://www.figma.com/design/rmw1qUPakQVQWuFIcT4LCi/PAW---PELITA?t=TlzjDUQPXhgfduHT-1)

## Video Demo dan Presentasi  

[Video Link](https://drive.google.com/file/d/1xCTvP4dNahc8SoAAmJk1Vx5eof2YTOu3/view?usp=drive_link)

## Web App Deployment
[Deployment Link](https://fe-pelita-production.up.railway.app/)

## How To Run

Install all dependencies and run the development server using this command

- **yarn** (recommended)

  ```
  yarn install
  yarn dev
  ```

- **npm**

  ```
  npm i
  npm run dev
  ```

## Pull & Push Schema

1. Checkout to develop branch
2. Pull origin develop
3. Create a new branch (Please read the rule below this section)
4. Checkout to the new branch
5. Code
6. Commit (Please follow the commit messages rule)
7. Pull origin develop
8. Push origin "your branch name"
9. Create a new pull request to develop branch
10. Done

## Branch Naming

`<type>/<short_description>.<nama_kamu>`

- `<type>` :
  - feature: saya menambahkan fitur baru
  - fixing: saya memperbaiki fitur

Contoh: feature/navbar.argy

## Commit message

`<type>(<scope>): <short_summary>`

- `<type>` :

  - feat: saya menambahkan fitur baru
  - fix: saya memperbaiki fitur

- `<scope>` : ini opsional
- `<summary>` : buat sejelas mungkin

Contoh: feat(Homepage): Creating about section

## Folder Structure

```
- public: file public (including assets)
- app : Contain all pages
- src
    - components : all components (layouts, button, navbar, etc)
        - Contexts: custom context
        - Element : Element kecil - kecil
        - Layout  : Berisi Layout untuk website, default, error, dkk
    - utils : Folder berisi fungsi - fungsi
        - helpers : pembantu (fetch backend, etc)
        - hooks : custom hooks
    - modules: all views
        - [Page name]
            - page.js
    - styles: kumpulan styling css
```

## Aturan Penulisan Variabel / File

- Gunakan **PascalCase** untuk menulis nama komponen / file komponen website
  DefaultLayout.js, Navbar.js
- Gunakan **camelCase** untuk menulis nama variabel / file non komponen
  data.js, dataFaq.js, createdAt, dkk
- Selalu gunakan .js file! Biar keliatan rapi + seragam aja reponya.

## Clean Code

- [Learn More](https://github.com/ryanmcdermott/clean-code-javascript)
- [Learn More 2](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29#:~:text=Code%20is%20clean%20if%20it,%2C%20changeability%2C%20extensibility%20and%20maintainability.)

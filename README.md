# MtG Accountant

## About
Made as a school project. Goal was to use and combine the technolgies taught at school (Node.js, express, SQL, API) to make a web-application. There were a lot of things that we hadn't gone through yet at school so there most likely will be some bad practices / usages as i had to try to figure them out myself.

The application is for keeping track of what Magic the Gathering cards the user owns. There are multiple views. My-collection for showing the whole MtG collection (only expansion and core). Set views show different sets data and when clicked shows all cards from that set. Single card-view will show more detailed information about a specific card.

Search function lets user search cards by a combination of name, rarity, price and set.

## Different endpoint views
### home/login

![login view](/images/MtGAcc_login.png)

### collections/my-collection

![my-collection view](/images/MtGAcc_mycollection.png)


### collections/sets

![sets view](/images/MtGAcc_sets.png)

### collections/sets/:set

![set cards view](/images/MtGAcc_sets_cards.png)

### collections/my-collection/:card

![single card view](/images/MtGAcc_singlecard.png)

### collections/search
Search:
![single card view](/images/MtGAcc_search.png)
Results:
![single card view](/images/MtGAcc_searchresults.png)

## Using
### Clone with:

    git clone https://github.com/ramiriekki/MtGAccountant.git

### Npm dependecies

    npm install

### Config folder

    mkdir config
    cd config
    touch dev.env

### dev.env
add these options

    ADMIN_PASSWORD=[MySQL password here]
    SESSION_SECRET=[secret here]

### SQL
SQL table structures included in the files

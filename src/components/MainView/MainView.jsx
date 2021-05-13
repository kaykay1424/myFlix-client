import React from 'react';

import MovieCard from '../MovieCard/MovieCard';
import MovieView from '../MovieView/MovieView';

class MainView extends React.Component {
    state = {
        movies: [
            {   
                description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
                director: {
                  bio: `James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition. He landed his first professional film job as art director, miniature-set builder, and process-projection supervisor on Roger Corman's Battle Beyond the Stars (1980) and had his first experience as a director with a two week stint on Piranha II: The Spawning (1981) before being fired.
                  He then wrote and directed The Terminator (1984), a futuristic action-thriller starring Arnold Schwarzenegger, Michael Biehn and Linda Hamilton. It was a low budget independent film, but Cameron's superb, dynamic direction made it a surprise mainstream success and it is now regarded as one of the most iconic pictures of the 1980s. After this came a string of successful, bigger budget science-fiction action films such as Aliens (1986), The Abyss (1989) and Terminator 2: Judgment Day (1991). In 1990, Cameron formed his own production company, Lightstorm Entertainment. In 1997, he wrote and directed Titanic (1997), a romance epic about two young lovers from different social classes who meet on board the famous ship. The movie went on to break all box office records and earned eleven Academy Awards. It became the highest grossing movie of all time until 12 years later, Avatar (2009), which invented and pioneered 3D film technology, and it went on to beat ""Titanic"", and became the first film to cost two billion dollars until 2019 when Marvel took the record.
                  James Cameron is now one of the most sought-after directors in Hollywood. He was formerly married to producer Gale Anne Hurd, who produced several of his films. In 2000, he married actress Suzy Amis, who appeared in Titanic, and they have three children.`,
                  birth_year: 1954,
                  death_year: null,
                  name: 'James Cameron'
                },
                featured: true,
                genre: {
                    description: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel, along with futuristic elements such as spacecraft, robots, cyborgs, interstellar travel or other technologies',
                    name: 'Sci-Fi'
                },
                image: 'https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_UX182_CR0,0,182,268_AL_.jpg',
                imdbLink: 'https://www.imdb.com/title/tt0499549/',
                name: 'Avatar'
            },
            {  
                description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
                director: {
                    bio: `James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition. He landed his first professional film job as art director, miniature-set builder, and process-projection supervisor on Roger Corman's Battle Beyond the Stars (1980) and had his first experience as a director with a two week stint on Piranha II: The Spawning (1981) before being fired.
                    He then wrote and directed The Terminator (1984), a futuristic action-thriller starring Arnold Schwarzenegger, Michael Biehn and Linda Hamilton. It was a low budget independent film, but Cameron's superb, dynamic direction made it a surprise mainstream success and it is now regarded as one of the most iconic pictures of the 1980s. After this came a string of successful, bigger budget science-fiction action films such as Aliens (1986), The Abyss (1989) and Terminator 2: Judgment Day (1991). In 1990, Cameron formed his own production company, Lightstorm Entertainment. In 1997, he wrote and directed Titanic (1997), a romance epic about two young lovers from different social classes who meet on board the famous ship. The movie went on to break all box office records and earned eleven Academy Awards. It became the highest grossing movie of all time until 12 years later, Avatar (2009), which invented and pioneered 3D film technology, and it went on to beat ""Titanic"", and became the first film to cost two billion dollars until 2019 when Marvel took the record.
                    James Cameron is now one of the most sought-after directors in Hollywood. He was formerly married to producer Gale Anne Hurd, who produced several of his films. In 2000, he married actress Suzy Amis, who appeared in Titanic, and they have three children.`,
                    birth_year: 1954,
                    death_year: null,
                    name: 'James Cameron'
                },
                featured: true,
                genre: {
                    description: 'In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.',
                    name: 'Drama'
                },
                image: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UX182_CR0,0,182,268_AL_.jpg',
                imdbLink: 'https://www.imdb.com/title/tt0120338/',
                name: 'Titanic'
            },
            {   
                description: 'In 2035, a technophobic cop investigates a crime that may have been perpetrated by a robot, which leads to a larger threat to humanity.',
                director: {
                    bio: `Alex Proyas has moved effortlessly between helming TV commercials and music videos to feature films. Born to Greek parents in Egypt, Proyas relocated to Australia with his family when he was three years old. He began making films at age ten and went on to attend the Australian Film Television and Radio School along with Jane Campion and Jocelyn Moorhouse. Proyas collaborated with Campion on two of her shorts, A Girl's Own Story (1984), for which he wrote and performed a song, and Passionless Moments (1985), which he photographed. Proyas' own short, Groping (1980), had earned him some attention at festival screenings in Sydney and London. Also while still a student, the enterprising novice formed Meaningful Eye Contact, a production company. Spirits of the Air, Gremlins of the Clouds (1987) marked Proyas' feature debut as director and screenwriter. Set in a post-apocalyptic world, the film, with its stylized production design and aural texture, was atypical of standard Australian fare, more closely resembling a longform music video. Critics admired the director's vision, but felt the overall result was lacking. Proyas continued to hone his craft helming TV advertisements for products like Nike, Nissan and Swatch (earning kudos from advertising associations in both Australia and England) and directing videos for such artists as Sting, INXS and Crowded House. In 1993 Proyas was tapped to helm the screen adaptation of James O'Barr's comic strip The Crow (1994). During production, star Brandon Lee died of an accidental gunshot wound (ironically, the film's story revolves around his character's resurrection). His death cast a pall over the remainder of the filming and its subsequent theatrical release, although reviews were generally favorably, most singling out the production values which created a colorless rain-soaked wasteland that invoked comparisons with Ridley Scott's seminal Blade Runner (1982) and Tim Burton's Batman (1989). Made for about $14 million, it grossed close to $50 million domestically. Proyas seemed set to move on to other projects and was announced as the director of Casper (1995), but left the project and was replaced by Brad Silberling. After a four-year absence he returned with another thriller, Dark City (1998), about an amnesiac who may or may not have been a serial killer. Garage Days (2002) marked Proyas' return to his homeland, Australia: the movie tells the story of a young Sydney garage band desperately trying to make it big in the competitive world of rock 'n' roll. In 2004 Proyas returned to Hollywood: he directed I, Robot (2004), a science-fiction film suggested by the 'Isaac Asimov' short story compilation of the same name that starred Will Smith. It was a box office success, but met with mixed reactions by readers and fans of the Asimov stories.`,
                    birth_year: 1963,
                    death_year: null,
                    name: 'Alex Proyas'
                },
                featured: false,
                genre: {
                    description: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel, along with futuristic elements such as spacecraft, robots, cyborgs, interstellar travel or other technologies',
                    name: 'Sci-Fi'
                },
                image: 'https://m.media-amazon.com/images/M/MV5BNmE1OWI2ZGItMDUyOS00MmU5LWE0MzUtYTQ0YzA1YTE5MGYxXkEyXkFqcGdeQXVyMDM5ODIyNw@@._V1_UY268_CR8,0,182,268_AL_.jpg',
                imdbLink: 'https://www.imdb.com/title/tt0343818/',
                name: 'I, Robot'
            },
            {  
                description: 'A band director recruits a Harlem street drummer to play at a Southern university.',
                director: {
                    bio: `Charles Stone III was born in 1966. He is a director and actor, known for Drumline (2002), Paid in Full (2002) and Mr. 3000 (2004).`,
                    birth_year: 1966,
                    death_year: null,
                    name: 'Charles Stone III'
                },
                featured: false,
                genre: {
                    description: 'In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.',
                    name: 'Drama'
                },
                image: 'https://m.media-amazon.com/images/M/MV5BNzhhY2Y3NDktM2JiYi00YmY0LWEzOGQtMDc4Yzk3ZWIxOTVmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg',
                imdbLink: 'https://www.imdb.com/title/tt0303933/',
                name: 'Drumline'
            },
            {  
                description: 'Four teenagers are sucked into a magical video game, and the only way they can escape is to work together to finish the game.',
                director: {
                    bio: `Jake Kasdan was born on October 28, 1974 in Detroit, Michigan, USA as Jacob Kasdan. He is a producer and director, known for Walk Hard: The Dewey Cox Story (2007), Jumanji: The Next Level (2019) and Zero Effect (1998).`,
                    birth_year: 1974,
                    death_year: null,
                    name: 'Jake Kasdan'
                },
                featured: false,
                genre: {
                    description: 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.',
                    name: 'Action'
                },
                image: 'https://m.media-amazon.com/images/M/MV5BODQ0NDhjYWItYTMxZi00NTk2LWIzNDEtOWZiYWYxZjc2MTgxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg',
                imdbLink: 'https://www.imdb.com/title/tt2283362/',
                name: 'Jumanji: Welcome to the Jungle'
            },
            {  
                description: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
                director: {
                    bio: `Anthony Russo was born on February 3, 1970 in Cleveland, Ohio, USA as Anthony J. Russo. He is a producer and director, known for Captain America: The Winter Soldier (2014), Avengers: Endgame (2019) and Avengers: Infinity War (2018).`,
                    birth_year: 1970,
                    death_year: null,
                    name: 'Anthony Russo'
                },
                featured: true,
                genre: {
                    description: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel, along with futuristic elements such as spacecraft, robots, cyborgs, interstellar travel or other technologies',
                    name: 'Sci-Fi'
                },
                image: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',
                imdbLink: 'https://www.imdb.com/title/tt4154796/',
                name: 'Avengers: End Game'
            },
            {  
                description: 'The African monarch Akeem learns he has a long-lost son in the United States and must return to America to meet this unexpected heir and build a relationship with his son.',
                director: {
                    bio: `Father, Walter D. Brewer worked in a number of high-level corporate positions for Matson Navigation Company, culminating in the position of director of corporate development from 1990-1998, when he died. His work caused the family to move from Vallejo, California (where Craig attended elementary school and junior high) to Orange County, returning to Vallejo in the early 1990s. Walter frequently rented out local theaters to present young Craig's plays and often financed Craig's productions.
                    Craig's mother, Gail, was a school board member for Vallejo's district both times the family lived there and taught English and Drama in nearby Mt. Diablo School District. She allowed her son, fresh out of high school, to teach her drama courses at College Park High School in Pleasant Hill, California and produce/direct the school's plays, with the school occasionally serving as a showcase for his original works. Craig's father also helped finance school productions, and helped to rent out local theaters for additional shows. Craig's high school friends, including future wife, Jodi Brewer and Chris Barela, took an active role in CPHS's drama department productions. Craig's younger sister, Amanda Brewer, attended CPHS from 1992-1995.`,
                    birth_year: 1971,
                    death_year: null,
                    name: 'Craig Brewer'
                },
                featured: true,
                genre: {
                    description: 'A comedy film is a category of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.',
                    name: 'Comedy'
                },
                image: 'https://m.media-amazon.com/images/M/MV5BZTMyY2Q2MDctMDFlMS00MWEzLTk1NmEtNDcxNzg1ZGJlNGU5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX182_CR0,0,182,268_AL_.jpg',
                imdbLink: 'https://www.imdb.com/title/tt6802400/',
                name: 'Coming 2 America'
            },
            { 
                description: 'Beca, a freshman at Barden University, is cajoled into joining The Bellas, her school\'s all-girls singing group. Injecting some much needed energy into their repertoire, The Bellas take on their male rivals in a campus competition.',
                director: {
                    bio: `Jason Moore was born on October 22, 1970 in Fayetteville, Arkansas, USA. He is a director and actor, known for Pitch Perfect 2 (2015), Pitch Perfect (2012) and Sisters (2015).`,
                    birth_year: 1970,
                    death_year: null,
                    name: 'Jason Moore'
                },
                featured: false,
                genre: {
                    description: 'A comedy film is a category of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.',
                    name: 'Comedy'
                },
                image: 'https://m.media-amazon.com/images/M/MV5BMTcyMTMzNzE5N15BMl5BanBnXkFtZTcwNzg5NjM5Nw@@._V1_UX182_CR0,0,182,268_AL_.jpg',
                imdbLink: 'https://www.imdb.com/title/tt1981677/',
                name: 'Pitch Perfect'
            },
            {  
                description: 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy\'s room.',
                director: {
                    bio: `Although born in Hollywood John and his twin sister, Johanna were raised in Wittier near Los Angeles. His parents were Jewell Mae (Risley), an art teacher, and Paul Eual Lasseter, a parts manager at a Chevrolet dealership. His mother's profession contributed to his interest in animation and particularly the Bugs Bunny and Daffy Duck cartoons which he would watch on television. It was when he was in High School that he realized that he could have a career in animation and he wrote to the Walt Disney Studios but nothing happened then In 1975 the Disney company started an animation course at Calarts - The California Institute of the Arts- and John, with encouragement from his mother, was one of the first to sign up. He and his class mates, who included the future animators and directors Brad Bird, and Tim Burton were taught by some of Disney's veteran animators such as Ollie Johnston and Frank Thomas. During his time there John produced two animated shorts - Lady and the Lamp (1979) and Nitemare (1980) - which both won the Student Academy Award for Animation. On graduating in 1979 John was taken on as an animator at the Disney Studios. In 1983, while working on Mickey's Christmas Carol some friends invited him to see some footage of Tron that they were working on using CGI and he immediately saw the potential of it to enhance animated films. John and a colleague made a short test film and satisfied with the result and full of enthusiasm started work on a feature without consulting their superiors who when they found out about it canceled it and sacked John. Having made contacts in the computer industry he was quickly taken on by Lucasfilm which was bought by Steve Jobs for $5 million with a further $5 million invested as working capital and the company renamed Pixar. John soon convinced Steve that the future lay in computer animation by bringing his desk lamp to life in the short 'Luxor Jr' which was shown at a computer graphics conference and got a standing ovation. The first computer animated feature soon followed in the form of 'Toy Story' winning John an Oscar for Special Achievement to go with one he got for Animated Short Film - Tin Toy. He's also had Oscar nominations for Animated Feature - Monster Inc and Cars, Original Screenplay -Toy Story, Animated Short Story - Luxor Jr while the short Knick Knack was selected by Terry Gilliam as one of the best 10 animated films of all time. In 2008, he was honored with the Winsor McCay Award, - the lifetime achievement award for animators. He oversees 3 animation studios - Pixar, Disney Animation and DisneyToon He spent 9 year (2005 - 2014) on the board of governors of the Academy of Motion Picture Arts and Sciences, only relinquishing his seat due to term limits. He was presented with a star on the Hollywood Walk of Fame in Hollywood in November 2011.`,
                    birth_year: 1957,
                    death_year: null,
                    name: 'John Lasseter'
                },
                featured: false,
                genre: {
                    description: 'Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.',
                    name: 'Animation'
                },
                image: 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg',
                imdbLink: 'https://www.imdb.com/title/tt0114709/',
                name: 'Toy Story'
            },
            {  
                description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
                director: {
                    bio: `Roger Allers was born on June 29, 1949 in Rye, New York, USA as Roger Charles Allers. He is known for his work on The Lion King (1994), Aladdin (1992) and Beauty and the Beast (1991). He has been married to Leslee Allers since 1965. They have two children.`,
                    birth_year: 1949,
                    death_year: null,
                    name: 'Roger Allers'
                },
                featured: true,
                genre: {
                    description: 'Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.',
                    name: 'Animation'
                },
                image: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_UX182_CR0,0,182,268_AL_.jpg',
                imdbLink: 'https://www.imdb.com/title/tt0110357/',
                name: 'The Lion King'
            }
        ] ,
        selectedMovie: null  
    }

    showAllMovies = () => {
        this.setState({
            selectedMovie: null
        });
    }
    
    showMovieDetails = (selectedMovie) => {
        this.setState({
            selectedMovie
        });
    }

    render() {
        const {movies, selectedMovie} = this.state;
        // If a user clicks on the read more link to select a movie
        if (selectedMovie) {
            return <MovieView selectedMovie={this.state.selectedMovie} showAllMovies={this.showAllMovies} />   
        // If there are movies to display
        } else if (movies.length > 0) {
            return (
                <div className="movies-container">
                    {this.state.movies.map((movie, i) => {
                        return (<MovieCard key={movie._id} movie={movie} showMovieDetails={this.showMovieDetails}  />)
                    })};
                </div>
            )
        // If there are no movies to display    
        } else if (movies.length === 0) {
            return <div>The movie list is empty</div>;
        }
    }
}

export default MainView;
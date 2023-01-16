import { format, formatDistanceToNow } from 'date-fns';
import ptBR  from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, JSXElementConstructor, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

interface Comment {
    textComment: string;
    commentedAt: Date;
}

export interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[]; /*coloquei o [] pra identificar que esse content é um array*/
}

export function Post({ author, publishedAt, content }:PostProps) {
    const [comments, setComments] = useState<Comment[]>([]);


    const [newCommentText, setNewCommentText] = useState('')


    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });


    function handleCreateComment (event: FormEvent) {
        event.preventDefault(); /*isso faz com que o html não mande para outra página como ele faz por padrão*/
        
        const comment:Comment = {
            textComment:newCommentText,
            commentedAt: new Date(),
        }

        setComments([...comments, comment]); /* aqui no ...comments ele está copiando os comentários que tem no comment*/
        setNewCommentText('');
    }

    function handleNewCommentChange (event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid (event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório o preenchimento.')
    }

    function onDeleteComment (commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment.textComment !== commentToDelete
        })
        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar 
                        src={author.avatarUrl}
                    />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}> {publishedDateRelativeToNow} </time>
                </header>

                <div className={styles.content}>
                    {content.map(line => {
                        if (line.type === 'paragraph'){
                            return (
                                <p key={line.content}>{line.content}</p>
                            )
                        } else if (line.type === 'link'){
                            return (
                                <p key={line.content}><a href="#">{line.content}</a></p> /*key={line.content} foi colocado no p pq precisa ser no primeiro elemento*/
                            )
                        }
                    })}
                </div>  

                <form onSubmit={handleCreateComment} className={styles.commentForm}>
                    <strong>Deixe seu feedback</strong>

                    <textarea
                        name='comment'
                        placeholder='Deixe seu comentário'
                        value={newCommentText}
                        onChange={handleNewCommentChange}
                        onInvalid={handleNewCommentInvalid}
                        required
                    />

                    <footer>
                        <button 
                            type='submit' disabled={isNewCommentEmpty}>
                                Publicar
                        </button>
                    </footer>
                </form>

                <div>
                    {comments.map(comment => {
                        return (
                            <Comment
                                commentedAt={comment.commentedAt}  
                                key={comment.textComment}
                                content={comment.textComment}
                                onDeleteComment={onDeleteComment}        
                            />
                        )
                    })}
                </div>
        </article>
    )
}
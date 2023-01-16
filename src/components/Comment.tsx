import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

interface CommentProps {
    content: string;
    commentedAt: Date;
    onDeleteComment: (commentToDelete: string) => void; /* para identificar que é um tipo função nós usamos o arrow function () =>, dentro do () passamos qual o parametro que ele vai receber, que nesse caso vai ser o comentário a ser excluido, e como essa função não retorna nada nós colocamos que é void, */
}

export function Comment({ content, onDeleteComment, commentedAt }: CommentProps) {
    const [likeCount, setLikeCount] = useState (0);

    const commentedDateFormatted = format(commentedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const commentedDateRelativeToNow = formatDistanceToNow(commentedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleDeleteComment () {
        onDeleteComment(content);
    }

    function handleLikeComment () {
        setLikeCount((stateLike) => {
            return stateLike + 1
        });
    } /*Aqui no stateLike ele vai ter como propriedade o likeCount, pq é a informação que o button tem, ai vamos chamar o setLikeCount que atualiza o estado desse likeCount, então se eu ver agora o estado dele é 0, mas se eu pegar o stateLike (0) + 1 = 1 e então se eu adicionar essa mesma funçao de novo logo abaixo, agora o stateLike vai ser 1 então stateLike (1) + 1 = 2 e então o retorno de cada clique para o usuário vai ser de 2 em 2 */

    return (
        <div className={styles.comment}>
            <Avatar 
                src="https://github.com/nadiacoelhoc.png"
                withBorder={false}
                alt=""
            />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Nádia Coelho</strong>
                            <time title={commentedDateFormatted} dateTime={commentedAt.toISOString()}> {commentedDateRelativeToNow} </time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24} />
                        </button>

                    </header>
                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}   
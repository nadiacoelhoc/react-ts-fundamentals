import styles from './Avatar.module.css';

interface AvatarProps {
    withBorder?: boolean;
    src: string;
    alt?: string;
}

export function Avatar({withBorder = true, src, alt}: AvatarProps) {
       return(
        <img 
            className={withBorder ? styles.avatarWhithBorder : styles.avatar}
            src={src} 
            alt="" 
        />
    )
}


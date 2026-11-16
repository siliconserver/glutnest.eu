# Mailserver

Glutnest verschickt Erinnerungen, Mängelmeldungen und Rundmails. Den Mailserver tragt
ihr in der `.env` ein:

```sh
EMAIL_HOST=smtp.example.org
EMAIL_PORT=587            # 587 = STARTTLS, 465 = SSL
EMAIL_HOST_USER=glutnest@example.org
EMAIL_HOST_PASSWORD=...
EMAIL_ABSENDER=Feuerwehr Musterstadt <glutnest@example.org>
```

Danach `docker compose up -d`. Ohne Mailserver verschickt Glutnest keine Mails; die
Startseite zeigt das Fällige trotzdem.

Die Wehr kann außerdem unter **Einstellungen → E-Mail** einen eigenen Server eintragen
und mit einer Testmail prüfen, siehe [E-Mail und Mailtexte](../verwaltung/mail.md).
Steht der Mailserver im internen Netz, muss das mit `GLUTNEST_MAILSERVER_PRIVAT=1` in der
`.env` erlaubt werden.

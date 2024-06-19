import boto3
from botocore.exceptions import ClientError
from config import Config

client = boto3.client(
    'ses',
    aws_access_key_id=Config.AWS_SES_ACCESS_KEY_ID,
    aws_secret_access_key=Config.AWS_SES_SECRET_ACCESS_KEY,
    region_name=Config.AWS_REGION
)

SENDER_FROM = Config.AWS_SES_SENDER_EMAIL
CHARSET = 'UTF-8'


def send_email(to: str, subject: str, body_text: str, body_html: str = None):
    """
    Send an email using AWS SES.

    :param to: Recipient email address
    :param subject: Subject of the email
    :param body_text: Plain text content of the email
    :param body_html: HTML content of the email (optional)
    :return: None
    """
    try:
        # Build the message body
        body = {
            'Text': {
                'Charset': CHARSET,
                'Data': body_text,
            }
        }
        if body_html:
            body['Html'] = {
                'Charset': CHARSET,
                'Data': body_html,
            }

        # Send email
        response = client.send_email(
            Destination={
                'ToAddresses': [to],
            },
            Message={
                'Body': body,
                'Subject': {
                    'Charset': CHARSET,
                    'Data': subject,
                },
            },
            Source=SENDER_FROM,
        )
    except ClientError as e:
        error_message = e.response['Error']['Message']
        print(f"Error: {error_message}")
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")
    else:
        message_id = response.get('MessageId')
        print(f"Email sent! Message ID: {message_id}")

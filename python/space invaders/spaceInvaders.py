import pygame
import random

# Initialize pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Space Invaders")

# Colors
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# Load assets
player_img = pygame.image.load("player.png")
enemy_img = pygame.image.load("enemy.png")
bullet_img = pygame.image.load("bullet.png")

# Player
player_x = WIDTH // 2 - 32
player_y = HEIGHT - 70
player_speed = 5

# Enemy
enemy_x = random.randint(50, WIDTH - 50)
enemy_y = random.randint(50, 150)
enemy_speed = 3

# Bullet
bullet_x = 0
bullet_y = player_y
bullet_speed = 7
bullet_fired = False

def draw_objects():
    screen.fill(WHITE)
    screen.blit(player_img, (player_x, player_y))
    screen.blit(enemy_img, (enemy_x, enemy_y))
    if bullet_fired:
        screen.blit(bullet_img, (bullet_x, bullet_y))
    pygame.display.update()

# Main loop
running = True
while running:
    pygame.time.delay(30)
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and player_x > 0:
        player_x -= player_speed
    if keys[pygame.K_RIGHT] and player_x < WIDTH - 64:
        player_x += player_speed
    if keys[pygame.K_SPACE] and not bullet_fired:
        bullet_x = player_x + 16
        bullet_y = player_y
        bullet_fired = True
    
    # Bullet movement
    if bullet_fired:
        bullet_y -= bullet_speed
        if bullet_y < 0:
            bullet_fired = False
    
    draw_objects()
    
pygame.quit()

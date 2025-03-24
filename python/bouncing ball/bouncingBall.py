import pygame
import math
import random

# Constants
WIDTH, HEIGHT = 800, 600
WHITE = (255, 255, 255)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
GRAVITY = 0.2
FRICTION = 0.99
HEXAGON_RADIUS = 200
ROTATION_SPEED = 1
BALL_RADIUS = 10

# Initialize Pygame
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()

def hexagon_points(center, radius, angle):
    """Generate the vertices of a rotated hexagon."""
    return [
        (center[0] + radius * math.cos(math.radians(angle + i * 60)),
         center[1] + radius * math.sin(math.radians(angle + i * 60)))
        for i in range(6)
    ]

# Ball class
class Ball:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.vx = random.uniform(-2, 2)
        self.vy = random.uniform(-2, 2)

    def update(self, hex_points, angle):
        self.vy += GRAVITY  # Apply gravity
        self.vx *= FRICTION  # Apply friction
        self.vy *= FRICTION
        self.x += self.vx
        self.y += self.vy

        # Check for collision with hexagon walls
        for i in range(6):
            p1 = hex_points[i]
            p2 = hex_points[(i + 1) % 6]
            
            # Edge normal vector
            edge = (p2[0] - p1[0], p2[1] - p1[1])
            normal = (-edge[1], edge[0])
            normal_length = math.sqrt(normal[0]**2 + normal[1]**2)
            normal = (normal[0] / normal_length, normal[1] / normal_length)
            
            # Ball to edge vector
            ball_to_edge = (self.x - p1[0], self.y - p1[1])
            dot_product = ball_to_edge[0] * normal[0] + ball_to_edge[1] * normal[1]
            
            if dot_product < BALL_RADIUS:
                # Reflect velocity
                velocity_dot_normal = self.vx * normal[0] + self.vy * normal[1]
                self.vx -= 2 * velocity_dot_normal * normal[0]
                self.vy -= 2 * velocity_dot_normal * normal[1]
                self.vx *= 0.8  # Energy loss
                self.vy *= 0.8
                # Move ball out of collision
                self.x += normal[0] * (BALL_RADIUS - dot_product)
                self.y += normal[1] * (BALL_RADIUS - dot_product)

    def draw(self):
        pygame.draw.circle(screen, RED, (int(self.x), int(self.y)), BALL_RADIUS)

# Initialize ball and rotation angle
ball = Ball(WIDTH // 2, HEIGHT // 2)
angle = 0

# Main loop
running = True
while running:
    screen.fill(WHITE)
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # Rotate hexagon
    angle += ROTATION_SPEED
    hex_points = hexagon_points((WIDTH // 2, HEIGHT // 2), HEXAGON_RADIUS, angle)
    
    # Draw hexagon
    pygame.draw.polygon(screen, BLUE, hex_points, 3)
    
    # Update and draw ball
    ball.update(hex_points, angle)
    ball.draw()
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()

.class Lcom/google/android/material/floatingactionbutton/b;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/google/android/material/floatingactionbutton/e;->a(Lcom/google/android/material/floatingactionbutton/e$d;Z)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field private a:Z

.field final synthetic b:Z

.field final synthetic c:Lcom/google/android/material/floatingactionbutton/e$d;

.field final synthetic d:Lcom/google/android/material/floatingactionbutton/e;


# direct methods
.method constructor <init>(Lcom/google/android/material/floatingactionbutton/e;ZLcom/google/android/material/floatingactionbutton/e$d;)V
    .locals 0

    iput-object p1, p0, Lcom/google/android/material/floatingactionbutton/b;->d:Lcom/google/android/material/floatingactionbutton/e;

    iput-boolean p2, p0, Lcom/google/android/material/floatingactionbutton/b;->b:Z

    iput-object p3, p0, Lcom/google/android/material/floatingactionbutton/b;->c:Lcom/google/android/material/floatingactionbutton/e$d;

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    return-void
.end method


# virtual methods
.method public onAnimationCancel(Landroid/animation/Animator;)V
    .locals 0

    const/4 p1, 0x1

    iput-boolean p1, p0, Lcom/google/android/material/floatingactionbutton/b;->a:Z

    return-void
.end method

.method public onAnimationEnd(Landroid/animation/Animator;)V
    .locals 2

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/b;->d:Lcom/google/android/material/floatingactionbutton/e;

    const/4 v0, 0x0

    iput v0, p1, Lcom/google/android/material/floatingactionbutton/e;->h:I

    const/4 v0, 0x0

    iput-object v0, p1, Lcom/google/android/material/floatingactionbutton/e;->i:Landroid/animation/Animator;

    iget-boolean v0, p0, Lcom/google/android/material/floatingactionbutton/b;->a:Z

    if-nez v0, :cond_1

    iget-object p1, p1, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    iget-boolean v0, p0, Lcom/google/android/material/floatingactionbutton/b;->b:Z

    if-eqz v0, :cond_0

    const/16 v0, 0x8

    goto :goto_0

    :cond_0
    const/4 v0, 0x4

    :goto_0
    iget-boolean v1, p0, Lcom/google/android/material/floatingactionbutton/b;->b:Z

    invoke-virtual {p1, v0, v1}, Lcom/google/android/material/internal/j;->a(IZ)V

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/b;->c:Lcom/google/android/material/floatingactionbutton/e$d;

    if-eqz p1, :cond_1

    invoke-interface {p1}, Lcom/google/android/material/floatingactionbutton/e$d;->b()V

    :cond_1
    return-void
.end method

.method public onAnimationStart(Landroid/animation/Animator;)V
    .locals 3

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/b;->d:Lcom/google/android/material/floatingactionbutton/e;

    iget-object v0, v0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    iget-boolean v1, p0, Lcom/google/android/material/floatingactionbutton/b;->b:Z

    const/4 v2, 0x0

    invoke-virtual {v0, v2, v1}, Lcom/google/android/material/internal/j;->a(IZ)V

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/b;->d:Lcom/google/android/material/floatingactionbutton/e;

    const/4 v1, 0x1

    iput v1, v0, Lcom/google/android/material/floatingactionbutton/e;->h:I

    iput-object p1, v0, Lcom/google/android/material/floatingactionbutton/e;->i:Landroid/animation/Animator;

    iput-boolean v2, p0, Lcom/google/android/material/floatingactionbutton/b;->a:Z

    return-void
.end method

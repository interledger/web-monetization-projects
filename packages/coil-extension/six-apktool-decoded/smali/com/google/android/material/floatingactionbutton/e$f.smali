.class abstract Lcom/google/android/material/floatingactionbutton/e$f;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""

# interfaces
.implements Landroid/animation/ValueAnimator$AnimatorUpdateListener;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lcom/google/android/material/floatingactionbutton/e;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x402
    name = "f"
.end annotation


# instance fields
.field private a:Z

.field private b:F

.field private c:F

.field final synthetic d:Lcom/google/android/material/floatingactionbutton/e;


# direct methods
.method private constructor <init>(Lcom/google/android/material/floatingactionbutton/e;)V
    .locals 0

    iput-object p1, p0, Lcom/google/android/material/floatingactionbutton/e$f;->d:Lcom/google/android/material/floatingactionbutton/e;

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    return-void
.end method

.method synthetic constructor <init>(Lcom/google/android/material/floatingactionbutton/e;Lcom/google/android/material/floatingactionbutton/b;)V
    .locals 0

    invoke-direct {p0, p1}, Lcom/google/android/material/floatingactionbutton/e$f;-><init>(Lcom/google/android/material/floatingactionbutton/e;)V

    return-void
.end method


# virtual methods
.method public onAnimationEnd(Landroid/animation/Animator;)V
    .locals 1

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e$f;->d:Lcom/google/android/material/floatingactionbutton/e;

    iget-object p1, p1, Lcom/google/android/material/floatingactionbutton/e;->o:Lb/a/a/a/h/a;

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e$f;->c:F

    invoke-virtual {p1, v0}, Lb/a/a/a/h/a;->b(F)V

    const/4 p1, 0x0

    throw p1
.end method

.method public onAnimationUpdate(Landroid/animation/ValueAnimator;)V
    .locals 4

    iget-boolean v0, p0, Lcom/google/android/material/floatingactionbutton/e$f;->a:Z

    const/4 v1, 0x0

    if-nez v0, :cond_0

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e$f;->d:Lcom/google/android/material/floatingactionbutton/e;

    iget-object p1, p1, Lcom/google/android/material/floatingactionbutton/e;->o:Lb/a/a/a/h/a;

    invoke-virtual {p1}, Lb/a/a/a/h/a;->b()F

    throw v1

    :cond_0
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e$f;->d:Lcom/google/android/material/floatingactionbutton/e;

    iget-object v0, v0, Lcom/google/android/material/floatingactionbutton/e;->o:Lb/a/a/a/h/a;

    iget v2, p0, Lcom/google/android/material/floatingactionbutton/e$f;->b:F

    iget v3, p0, Lcom/google/android/material/floatingactionbutton/e$f;->c:F

    sub-float/2addr v3, v2

    invoke-virtual {p1}, Landroid/animation/ValueAnimator;->getAnimatedFraction()F

    move-result p1

    mul-float/2addr v3, p1

    add-float/2addr v2, v3

    invoke-virtual {v0, v2}, Lb/a/a/a/h/a;->b(F)V

    throw v1
.end method

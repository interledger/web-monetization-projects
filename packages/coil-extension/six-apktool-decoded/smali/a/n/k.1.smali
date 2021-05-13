.class La/n/k;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/n/m;->a(Landroid/view/ViewGroup;La/n/M;La/n/M;)Landroid/animation/Animator;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field private a:Z

.field final synthetic b:Landroid/view/View;

.field final synthetic c:Landroid/graphics/Rect;

.field final synthetic d:I

.field final synthetic e:I

.field final synthetic f:I

.field final synthetic g:I

.field final synthetic h:La/n/m;


# direct methods
.method constructor <init>(La/n/m;Landroid/view/View;Landroid/graphics/Rect;IIII)V
    .locals 0

    iput-object p1, p0, La/n/k;->h:La/n/m;

    iput-object p2, p0, La/n/k;->b:Landroid/view/View;

    iput-object p3, p0, La/n/k;->c:Landroid/graphics/Rect;

    iput p4, p0, La/n/k;->d:I

    iput p5, p0, La/n/k;->e:I

    iput p6, p0, La/n/k;->f:I

    iput p7, p0, La/n/k;->g:I

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    return-void
.end method


# virtual methods
.method public onAnimationCancel(Landroid/animation/Animator;)V
    .locals 0

    const/4 p1, 0x1

    iput-boolean p1, p0, La/n/k;->a:Z

    return-void
.end method

.method public onAnimationEnd(Landroid/animation/Animator;)V
    .locals 4

    iget-boolean p1, p0, La/n/k;->a:Z

    if-nez p1, :cond_0

    iget-object p1, p0, La/n/k;->b:Landroid/view/View;

    iget-object v0, p0, La/n/k;->c:Landroid/graphics/Rect;

    invoke-static {p1, v0}, La/g/i/s;->a(Landroid/view/View;Landroid/graphics/Rect;)V

    iget-object p1, p0, La/n/k;->b:Landroid/view/View;

    iget v0, p0, La/n/k;->d:I

    iget v1, p0, La/n/k;->e:I

    iget v2, p0, La/n/k;->f:I

    iget v3, p0, La/n/k;->g:I

    invoke-static {p1, v0, v1, v2, v3}, La/n/ba;->a(Landroid/view/View;IIII)V

    :cond_0
    return-void
.end method
